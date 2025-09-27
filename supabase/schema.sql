-- users and roles
create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  auth_id uuid references auth.users(id),
  display_name text,
  role text not null check (role in ('closer','entreprise')),
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- closers profile details
create table if not exists closers (
  id uuid primary key references profiles(id),
  age int,
  experience text,
  availability text,
  weekly_calls text,
  avg_cart text,
  commission text,
  prime boolean
);

-- entreprise offers
create table if not exists entreprises (
  id uuid primary key references profiles(id),
  company_name text,
  hiring_steps text,
  description text
);

-- Cards / offers (published items)
create table if not exists cards (
  id uuid primary key default gen_random_uuid(),
  owner_profile uuid references profiles(id),
  card_type text not null check (card_type in ('closer_profile','entreprise_offer')),
  title text,
  meta jsonb,
  channel text,
  published boolean default true,
  created_at timestamptz default now()
);

-- Conversations and messages
create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now()
);

create table if not exists conversation_participants (
  conversation_id uuid references conversations(id),
  profile_id uuid references profiles(id),
  primary key (conversation_id, profile_id)
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references conversations(id),
  sender_profile uuid references profiles(id),
  body text,
  meta jsonb,
  created_at timestamptz default now()
);

-- CTA events/applications
create table if not exists applications (
  id uuid primary key default gen_random_uuid(),
  card_id uuid references cards(id),
  from_profile uuid references profiles(id),
  to_profile uuid references profiles(id),
  application_type text check (application_type in ('hire_request','apply_request')),
  created_at timestamptz default now()
);

-- Helper function: find or create conversation between two profiles
create or replace function find_or_create_conversation(p_one uuid, p_two uuid)
returns table(id uuid) as $$
declare
  convo_id uuid;
begin
  select c.id into convo_id
  from conversations c
  join conversation_participants p1 on p1.conversation_id = c.id and p1.profile_id = p_one
  join conversation_participants p2 on p2.conversation_id = c.id and p2.profile_id = p_two
  limit 1;

  if convo_id is null then
    insert into conversations default values returning conversations.id into convo_id;
    insert into conversation_participants(conversation_id, profile_id) values (convo_id, p_one), (convo_id, p_two);
  end if;

  return query select convo_id;
end;
$$ language plpgsql security definer;


-- Auth: auto-create profile on signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (auth_id, display_name, role)
  values (new.id, null, 'closer');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure handle_new_user();

-- Enable RLS and add minimal policies
alter table public.profiles enable row level security;
alter table public.cards enable row level security;
alter table public.applications enable row level security;
alter table public.messages enable row level security;
alter table public.conversations enable row level security;
alter table public.conversation_participants enable row level security;

-- Profiles: users can select their own profile; service role can manage all (implicit)
drop policy if exists select_own_profile on public.profiles;
create policy select_own_profile on public.profiles
for select to authenticated
using (auth.uid() = auth_id);

-- Cards policies
drop policy if exists select_cards_all on public.cards;
create policy select_cards_all on public.cards
for select to authenticated
using (true);

drop policy if exists insert_own_card on public.cards;
create policy insert_own_card on public.cards
for insert to authenticated
with check (owner_profile in (select id from public.profiles where auth_id = auth.uid()));

drop policy if exists update_own_card on public.cards;
create policy update_own_card on public.cards
for update to authenticated
using (owner_profile in (select id from public.profiles where auth_id = auth.uid()))
with check (owner_profile in (select id from public.profiles where auth_id = auth.uid()));

drop policy if exists delete_own_card on public.cards;
create policy delete_own_card on public.cards
for delete to authenticated
using (owner_profile in (select id from public.profiles where auth_id = auth.uid()));

-- Applications: insert only as from_profile = current user's profile; select limited to involved users
drop policy if exists select_involved_applications on public.applications;
create policy select_involved_applications on public.applications
for select to authenticated
using (
  from_profile in (select id from public.profiles where auth_id = auth.uid())
  or to_profile in (select id from public.profiles where auth_id = auth.uid())
);

drop policy if exists insert_own_application on public.applications;
create policy insert_own_application on public.applications
for insert to authenticated
with check (from_profile in (select id from public.profiles where auth_id = auth.uid()));

-- Messages: participants-only access
drop policy if exists select_participant_messages on public.messages;
create policy select_participant_messages on public.messages
for select to authenticated
using (
  exists (
    select 1 from public.conversation_participants cp
    where cp.conversation_id = messages.conversation_id
      and cp.profile_id in (select id from public.profiles where auth_id = auth.uid())
  )
);

drop policy if exists insert_participant_messages on public.messages;
create policy insert_participant_messages on public.messages
for insert to authenticated
with check (
  sender_profile in (select id from public.profiles where auth_id = auth.uid()) and
  exists (
    select 1 from public.conversation_participants cp
    where cp.conversation_id = messages.conversation_id
      and cp.profile_id = sender_profile
  )
);

