"use client";
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRealtime } from '../hooks/useRealtime';
import type { Card } from '../types';
import CardCloser from './CardCloser';
import CardEntreprise from './CardEntreprise';

export default function ChannelFeed({ channel }: { channel: string }) {
        const [cards, setCards] = useState<Card[]>([]);

        useEffect(() => {
                supabase
                        .from('cards')
                        .select('*')
                        .eq('channel', channel)
                        .then(({ data }) => setCards((data as Card[]) ?? []));
        }, [channel]);

        useRealtime<Card>('cards', (c) => {
                if ((c as unknown as Card).channel === channel) {
                        setCards((prev) => [c as unknown as Card, ...prev]);
                }
        });

        return (
                <div className="space-y-4">
                        {cards.map((card) => (
                                <div key={card.id}>
                                        {card.card_type === 'closer_profile' ? (
                                                <CardCloser card={card} currentRole={'entreprise'} />
                                        ) : (
                                                <CardEntreprise card={card} currentRole={'closer'} />
                                        )}
                                </div>
                        ))}
                </div>
        );
}


