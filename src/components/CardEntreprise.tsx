"use client";
import type { Card } from '../types';

export default function CardEntreprise({ card, currentRole, onAfterCta }: { card: Card; currentRole: 'closer' | 'entreprise'; onAfterCta?: () => void }) {
        const meta = (card.meta ?? {}) as any;
        const canApply = currentRole === 'closer';

        async function onApply() {
                if (!canApply) return;
                await fetch('/api/cta/apply', {
                        method: 'POST',
                        body: JSON.stringify({ cardId: card.id, fromProfileId: 'me', toProfileId: card.owner_profile }),
                });
                onAfterCta?.();
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
                                disabled={!canApply}
                                className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-lime-400 to-green-600 font-semibold disabled:opacity-40"
                        >
                                Apply now
                        </button>
                </div>
        );
}



