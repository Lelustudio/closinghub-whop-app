"use client";
import Link from 'next/link';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import NavigationArrow from './NavigationArrow';

interface Card {
    id: string;
    title: string;
    meta: any;
    created_at: string;
}

function EntrepriseChannelContent() {
    const [cards, setCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalCards, setTotalCards] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [storageType, setStorageType] = useState<'memory' | 'supabase'>('memory');
    const searchParams = useSearchParams();
    const created = searchParams.get('created');

    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = async (page = 1, limit = 12) => {
        try {
            const offset = (page - 1) * limit;
            const response = await fetch(`/api/cards?channel=entreprise&card_type=entreprise_offer&limit=${limit}&offset=${offset}`);
            const data = await response.json();
            if (data.success) {
                setCards(data.cards);
                setTotalCards(data.total);
                setCurrentPage(page);
                setStorageType(data.storage_type || 'memory');
            }
        } catch (error) {
            console.error('Error fetching cards:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen p-6">
            <NavigationArrow href="/" />
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-extrabold text-white mb-2">Companies Channel</h1>
                        <p className="text-white/70">Discover the best job opportunities from companies</p>
                        <div className="flex items-center gap-4 mt-2">
                            {created && (
                                <div className="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg">
                                    <p className="text-green-400 text-sm">✅ Offer created successfully!</p>
                                </div>
                            )}
                            <div className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                                <p className="text-blue-400 text-xs">
                                    💾 Storage: {storageType === 'memory' ? 'Memory (dev)' : 'Supabase (prod)'}
                                </p>
                            </div>
                            {totalCards > 0 && (
                                <div className="px-3 py-1 bg-gray-500/20 border border-gray-500/30 rounded-lg">
                                    <p className="text-gray-400 text-xs">
                                        📊 {totalCards} offer{totalCards > 1 ? 's' : ''} total
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                    <Link
                        href="/entreprise/create-offer"
                        className="px-6 py-3 rounded-[25px] font-semibold text-black transition-all duration-300 hover:scale-105"
                        style={{
                            background: "linear-gradient(90deg, #8CFF8E 0%, #00FF04 45%, #0FBF0F 100%)",
                            boxShadow: "0 10px 30px rgba(0,255,4,0.28), inset 0 1px 0 rgba(255,255,255,0.35)",
                        }}
                    >
                        + Publish an offer
                    </Link>
                </div>

                {/* Navigation */}
                <div className="flex gap-4 mb-8">
                    <Link
                        href="/"
                        className="px-4 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                    >
                        ← Back to home
                    </Link>
                    <Link
                        href="/closer"
                        className="px-4 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                    >
                        View Closer profiles
                    </Link>
                    <Link
                        href="/messages"
                        className="px-4 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2"
                    >
                        💬 Messages
                    </Link>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="text-center py-12">
                        <p className="text-white/50">Loading offers...</p>
                    </div>
                )}

                {/* Cards */}
                {!loading && cards.length > 0 && (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {cards.map((card) => (
                            <div
                                key={card.id}
                                className="rounded-[25px] text-white p-6 shadow-xl border border-neutral-700"
                                style={{
                                    background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 100%)",
                                }}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full border-2 border-blue-500 bg-neutral-900 grid place-items-center">
                                        <img
                                            src="/images/entreprise-icon.svg"
                                            alt="Company"
                                            className="w-8 h-8 object-contain"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{card.meta.company_name}</h3>
                                        <p className="text-sm text-white/60">Experience: {card.meta.experience_required}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                                    <div>Weekly calls: {card.meta.weekly_calls}</div>
                                    <div>Avg cart: {card.meta.avg_cart}</div>
                                    <div>Commission: {card.meta.commission || 'N/A'}</div>
                                    <div>Bonus: {card.meta.prime ? 'Yes' : 'No'}</div>
                                </div>
                                <div className="mb-4">
                                    <p className="text-xs text-white/60 line-clamp-2">{card.meta.description}</p>
                                </div>
                                <button
                                    className="w-full py-2 rounded-lg bg-gradient-to-r from-lime-400 to-green-600 font-semibold text-black"
                                    onClick={() => alert('Apply now feature under development')}
                                >
                                    Apply now
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {!loading && cards.length === 0 && (
                    <div className="text-center mt-12">
                        <p className="text-white/50 text-lg">
                            No job offers have been published yet.
                        </p>
                        <p className="text-white/30 text-sm mt-2">
                            Be the first to publish an offer!
                        </p>
                    </div>
                )}

                {/* Pagination */}
                {!loading && totalCards > 12 && (
                    <div className="flex items-center justify-center gap-4 mt-12">
                        <button
                            onClick={() => fetchCards(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 rounded-lg bg-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
                        >
                            ← Previous
                        </button>
                        
                        <div className="flex items-center gap-2">
                            {Array.from({ length: Math.ceil(totalCards / 12) }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => fetchCards(page)}
                                    className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                                        page === currentPage
                                            ? 'bg-green-500 text-black font-semibold'
                                            : 'bg-white/10 text-white hover:bg-white/20'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                        
                        <button
                            onClick={() => fetchCards(currentPage + 1)}
                            disabled={currentPage >= Math.ceil(totalCards / 12)}
                            className="px-4 py-2 rounded-lg bg-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
                        >
                            Next →
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}

export default function EntrepriseChannel() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-white/50">Loading...</p></div>}>
            <EntrepriseChannelContent />
        </Suspense>
    );
}