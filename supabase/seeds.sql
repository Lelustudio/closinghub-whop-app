-- Minimal seed placeholders
-- Insert two demo profiles (not linked to auth) for local preview only
insert into profiles (display_name, role, avatar_url)
values ('Demo Closer', 'closer', null)
on conflict do nothing;

insert into profiles (display_name, role, avatar_url)
values ('Demo Entreprise', 'entreprise', null)
on conflict do nothing;


