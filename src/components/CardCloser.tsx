"use client";
import type { Card } from '../types';

export default function CardCloser({ card, currentRole, onAfterCta }: { card: Card; currentRole: 'closer' | 'entreprise'; onAfterCta?: () => void }) {
        const meta = (card.meta ?? {}) as any;
        const canHire = currentRole === 'entreprise';

        async function onHire() {
                if (!canHire) return;
                await fetch('/api/cta/hire', {
                        method: 'POST',
                        body: JSON.stringify({ cardId: card.id, fromProfileId: 'me', toProfileId: card.owner_profile }),
                });
                onAfterCta?.();
        }

        return (
                <div className="rounded-2xl p-6 bg-gradient-to-br from-neutral-800 to-black border border-neutral-700 text-white">
                        <div className="text-2xl font-bold">Closer profile</div>
                        <div className="opacity-80">{card.title}</div>
                        <div className="mt-4 grid grid-cols-2 gap-2 text-sm opacity-90">
                                <div>Experience: {meta.experience}</div>
                                <div>Age: {meta.age}</div>
                                <div>Weekly calls: {meta.weekly_calls}</div>
                                <div>Avg cart: {meta.avg_cart}</div>
                        </div>
                        <button
                                onClick={onHire}
                                disabled={!canHire}
                                className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-lime-400 to-green-600 font-semibold disabled:opacity-40"
                        >
                                Hire now
                        </button>
                </div>
        );
}



