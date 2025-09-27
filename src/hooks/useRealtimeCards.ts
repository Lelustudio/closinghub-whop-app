import { useEffect, useState } from 'react';

interface Card {
	id: string;
	title: string;
	meta: any;
	created_at: string;
}

interface UseRealtimeCardsOptions {
	channel?: string;
	cardType?: string;
	enabled?: boolean;
}

export function useRealtimeCards(options: UseRealtimeCardsOptions = {}) {
	const [cards, setCards] = useState<Card[]>([]);
	const [loading, setLoading] = useState(true);
	const [totalCards, setTotalCards] = useState(0);
	const [storageType, setStorageType] = useState<'memory' | 'supabase'>('memory');

	const fetchCards = async (page = 1, limit = 12) => {
		try {
			const offset = (page - 1) * limit;
			const params = new URLSearchParams({
				limit: limit.toString(),
				offset: offset.toString(),
			});

			if (options.channel) params.append('channel', options.channel);
			if (options.cardType) params.append('card_type', options.cardType);

			const response = await fetch(`/api/cards?${params}`);
			const data = await response.json();
			
			if (data.success) {
				setCards(data.cards);
				setTotalCards(data.total);
				setStorageType(data.storage_type || 'memory');
			}
		} catch (error) {
			console.error('Error fetching cards:', error);
		} finally {
			setLoading(false);
		}
	};

	// Polling pour les mises à jour en temps réel (simulation)
	useEffect(() => {
		if (!options.enabled) return;

		fetchCards();

		// Polling toutes les 30 secondes pour les nouvelles cartes
		const interval = setInterval(() => {
			fetchCards();
		}, 30000);

		return () => clearInterval(interval);
	}, [options.channel, options.cardType, options.enabled]);

	// Fonction pour rafraîchir manuellement
	const refresh = () => {
		setLoading(true);
		fetchCards();
	};

	return {
		cards,
		loading,
		totalCards,
		storageType,
		fetchCards,
		refresh,
	};
}
