import { NextRequest, NextResponse } from 'next/server';

// Stockage temporaire en mémoire (pour les tests)
let cards: any[] = [];

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		
		// Validation basique
		if (!body.card_type || !body.title || !body.meta) {
			return NextResponse.json(
				{ error: 'Missing required fields' },
				{ status: 400 }
			);
		}

		// Créer la carte
		const newCard = {
			id: `card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
			owner_profile: 'demo_user', // Pour les tests
			card_type: body.card_type,
			title: body.title,
			meta: body.meta,
			channel: body.channel || 'general',
			published: body.published || false,
			created_at: new Date().toISOString(),
		};

		// Ajouter à la liste
		cards.push(newCard);

		console.log('Card created:', newCard);
		console.log('Total cards:', cards.length);

		return NextResponse.json({
			success: true,
			card: newCard,
		});
	} catch (error) {
		console.error('Error creating card:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const channel = searchParams.get('channel');
		const cardType = searchParams.get('card_type');

		let filteredCards = cards;

		// Filtrer par canal
		if (channel) {
			filteredCards = filteredCards.filter(card => card.channel === channel);
		}

		// Filtrer par type de carte
		if (cardType) {
			filteredCards = filteredCards.filter(card => card.card_type === cardType);
		}

		// Trier par date de création (plus récent en premier)
		filteredCards.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

		return NextResponse.json({
			success: true,
			cards: filteredCards,
			total: filteredCards.length,
		});
	} catch (error) {
		console.error('Error fetching cards:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}
