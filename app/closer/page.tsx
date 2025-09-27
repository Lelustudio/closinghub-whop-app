"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface Card {
	id: string;
	title: string;
	meta: any;
	created_at: string;
}

export default function CloserHome() {
	const [cards, setCards] = useState<Card[]>([]);
	const [loading, setLoading] = useState(true);
	const searchParams = useSearchParams();
	const created = searchParams.get('created');

	useEffect(() => {
		fetchCards();
	}, []);

	const fetchCards = async () => {
		try {
			const response = await fetch('/api/cards?channel=closer&card_type=closer_profile');
			const data = await response.json();
			if (data.success) {
				setCards(data.cards);
			}
		} catch (error) {
			console.error('Error fetching cards:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className="min-h-screen p-6">
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<div className="flex items-center justify-between mb-8">
					<div>
						<h1 className="text-4xl font-extrabold text-white mb-2">Canal Closers</h1>
						<p className="text-white/70">Découvrez les meilleurs profils de Closers disponibles</p>
						{created && (
							<div className="mt-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg">
								<p className="text-green-400 text-sm">✅ Profil créé avec succès !</p>
							</div>
						)}
					</div>
					<Link 
						href="/closer/create-profile"
						className="px-6 py-3 rounded-[25px] font-semibold text-black transition-all duration-300 hover:scale-105"
						style={{
							background: "linear-gradient(90deg, #8CFF8E 0%, #00FF04 45%, #0FBF0F 100%)",
							boxShadow: "0 10px 30px rgba(0,255,4,0.28), inset 0 1px 0 rgba(255,255,255,0.35)",
						}}
					>
						+ Créer mon profil
					</Link>
				</div>

				{/* Navigation */}
				<div className="flex gap-4 mb-8">
					<Link 
						href="/"
						className="px-4 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
					>
						← Retour à l'accueil
					</Link>
					<Link 
						href="/entreprise"
						className="px-4 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
					>
						Voir les offres d'emploi
					</Link>
				</div>

				{/* Loading */}
				{loading && (
					<div className="text-center py-12">
						<p className="text-white/50">Chargement des profils...</p>
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
											src="/images/closer-icon.svg" 
											alt="Closer" 
											className="w-8 h-8 object-contain"
										/>
									</div>
									<div>
										<h3 className="font-semibold">{card.meta.display_name}</h3>
										<p className="text-sm text-white/60">Expérience: {card.meta.experience}</p>
									</div>
								</div>
								<div className="grid grid-cols-2 gap-2 text-sm mb-4">
									<div>Age: {card.meta.age}</div>
									<div>Weekly calls: {card.meta.weekly_calls}</div>
									<div>Avg cart: {card.meta.avg_cart}</div>
									<div>Commission: {card.meta.commission || 'N/A'}</div>
								</div>
								<button 
									className="w-full py-2 rounded-lg bg-gradient-to-r from-lime-400 to-green-600 font-semibold text-black"
									onClick={() => alert('Fonctionnalité Hire now en cours de développement')}
								>
									Hire now
								</button>
							</div>
						))}
					</div>
				)}

				{/* Empty state */}
				{!loading && cards.length === 0 && (
					<div className="text-center mt-12">
						<p className="text-white/50 text-lg">
							Aucun profil de Closer n'a encore été créé.
						</p>
						<p className="text-white/30 text-sm mt-2">
							Soyez le premier à créer votre profil !
						</p>
					</div>
				)}
			</div>
		</main>
	);
}



