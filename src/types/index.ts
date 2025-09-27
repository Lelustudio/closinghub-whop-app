export type UserRole = 'closer' | 'entreprise';

export interface Profile {
        id: string;
        auth_id?: string | null;
        display_name: string | null;
        role: UserRole;
        avatar_url: string | null;
        created_at?: string;
}

export type CardType = 'closer_profile' | 'entreprise_offer';

export interface Card {
        id: string;
        owner_profile: string;
        card_type: CardType;
        title: string | null;
        meta: Record<string, unknown> | null;
        channel: string | null;
        published: boolean;
        created_at?: string;
}

export interface Conversation {
        id: string;
        created_at?: string;
}

export interface Message {
        id: string;
        conversation_id: string;
        sender_profile: string;
        body: string;
        created_at?: string;
}


