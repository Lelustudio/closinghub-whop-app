"use client";
import type { Card } from '../types';
import { useState } from 'react';

export default function CardEntreprise({ card, currentRole, onAfterCta }: { card: Card; currentRole: 'closer' | 'entreprise'; onAfterCta?: () => void }) {
        const meta = (card.meta ?? {}) as any;
        const canApply = currentRole === 'closer';
        const [isSending, setIsSending] = useState(false);
        const [messageSent, setMessageSent] = useState(false);

        async function onApply() {
                if (!canApply || isSending) return;
                
                setIsSending(true);
                try {
                        // Envoyer un message d'intérêt via Whop
                        const response = await fetch('/api/messaging/send', {
                                method: 'POST',
                                headers: {
                                        'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                        toUserId: card.owner_profile, // ID du propriétaire de la carte
                                        cardId: card.id,
                                        cardTitle: card.title,
                                        cardMeta: card.meta,
                                        cardType: card.card_type,
                                        messageType: 'apply_interest'
                                }),
                        });

                        const result = await response.json();
                        
                        if (result.success) {
                                setMessageSent(true);
                                // Afficher une notification de succès
                                alert('Candidature envoyée avec succès ! L\'entreprise a été notifiée de votre intérêt.');
                        } else {
                                alert('Erreur lors de l\'envoi de la candidature: ' + result.error);
                        }
                } catch (error) {
                        console.error('Error sending apply message:', error);
                        alert('Erreur lors de l\'envoi de la candidature');
                } finally {
                        setIsSending(false);
                        onAfterCta?.();
                }
        }

        return (
                <div className="rounded-2xl p-6 bg-gradient-to-br from-neutral-800 to-black border border-neutral-700 text-white">
                        <div className="text-2xl font-bold">Contract details</div>
                        <div className="opacity-80">{card.title}</div>
                        <div className="mt-4 grid grid-cols-2 gap-2 text-sm opacity-90">
                                <div>Weekly calls: {meta.weekly_calls}</div>
                                <div>Avg cart: {meta.avg_cart}</div>
                                <div>Commission: {meta.commission}</div>
                                <div>Prime: {meta.prime ? 'Yes' : 'No'}</div>
                        </div>
                        <button
                                onClick={onApply}
                                disabled={!canApply || isSending || messageSent}
                                className={`mt-6 w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                                        messageSent 
                                                ? 'bg-green-600 text-white' 
                                                : isSending 
                                                        ? 'bg-yellow-500 text-black' 
                                                        : canApply 
                                                                ? 'bg-gradient-to-r from-lime-400 to-green-600 hover:from-lime-300 hover:to-green-500' 
                                                                : 'bg-gray-500 text-gray-300'
                                }`}
                        >
                                {messageSent ? '✅ Candidature envoyée' : isSending ? '📤 Envoi...' : 'Apply now'}
                        </button>
                </div>
        );
}



