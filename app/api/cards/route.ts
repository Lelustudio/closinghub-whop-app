import { NextRequest, NextResponse } from 'next/server';
import { DataService } from '../../../src/lib/dataService';

const dataService = DataService.getInstance();

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

		// Créer la carte via le service unifié
		const newCard = await dataService.createCard({
			card_type: body.card_type,
			title: body.title,
			meta: body.meta,
			channel: body.channel || 'general',
			published: body.published || false,
		});

		console.log('Card created via DataService:', newCard);
		console.log('Storage type:', dataService.getStorageType());

		return NextResponse.json({
			success: true,
			card: newCard,
			storage_type: dataService.getStorageType(),
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
		const limit = searchParams.get('limit');
		const offset = searchParams.get('offset');

		// Récupérer les cartes via le service unifié
		const result = await dataService.getCards({
			channel: channel || undefined,
			card_type: cardType || undefined,
			limit: limit ? parseInt(limit) : undefined,
			offset: offset ? parseInt(offset) : undefined,
		});

		console.log('Cards fetched via DataService:', result.cards.length, 'total:', result.total);
		console.log('Storage type:', dataService.getStorageType());

		return NextResponse.json({
			success: true,
			cards: result.cards,
			total: result.total,
			storage_type: dataService.getStorageType(),
		});
	} catch (error) {
		console.error('Error fetching cards:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}
