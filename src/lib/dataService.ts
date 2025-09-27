import { config } from './config';

export interface Card {
	id: string;
	owner_profile: string;
	card_type: 'closer_profile' | 'entreprise_offer';
	title: string;
	meta: Record<string, any>;
	channel: string;
	published: boolean;
	created_at: string;
}

export interface CreateCardData {
	card_type: 'closer_profile' | 'entreprise_offer';
	title: string;
	meta: Record<string, any>;
	channel: string;
	published?: boolean;
}

// Stockage mémoire pour le développement
let memoryCards: Card[] = [];

// Service de données unifié
export class DataService {
	private static instance: DataService;
	
	private constructor() {}
	
	public static getInstance(): DataService {
		if (!DataService.instance) {
			DataService.instance = new DataService();
		}
		return DataService.instance;
	}
	
	// Créer une carte
	async createCard(data: CreateCardData): Promise<Card> {
		if (config.useMemoryStorage) {
			return this.createCardInMemory(data);
		} else {
			return this.createCardInSupabase(data);
		}
	}
	
	// Récupérer les cartes
	async getCards(filters?: {
		channel?: string;
		card_type?: string;
		limit?: number;
		offset?: number;
	}): Promise<{ cards: Card[]; total: number }> {
		if (config.useMemoryStorage) {
			return this.getCardsFromMemory(filters);
		} else {
			return this.getCardsFromSupabase(filters);
		}
	}
	
	// Méthodes pour le stockage mémoire
	private createCardInMemory(data: CreateCardData): Card {
		const newCard: Card = {
			id: `card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
			owner_profile: 'demo_user',
			card_type: data.card_type,
			title: data.title,
			meta: data.meta,
			channel: data.channel,
			published: data.published || false,
			created_at: new Date().toISOString(),
		};
		
		memoryCards.push(newCard);
		console.log('Card created in memory:', newCard);
		console.log('Total cards in memory:', memoryCards.length);
		
		return newCard;
	}
	
	private getCardsFromMemory(filters?: {
		channel?: string;
		card_type?: string;
		limit?: number;
		offset?: number;
	}): { cards: Card[]; total: number } {
		let filteredCards = [...memoryCards];
		
		// Appliquer les filtres
		if (filters?.channel) {
			filteredCards = filteredCards.filter(card => card.channel === filters.channel);
		}
		
		if (filters?.card_type) {
			filteredCards = filteredCards.filter(card => card.card_type === filters.card_type);
		}
		
		// Trier par date de création (plus récent en premier)
		filteredCards.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
		
		// Appliquer la pagination
		const offset = filters?.offset || 0;
		const limit = filters?.limit || filteredCards.length;
		const paginatedCards = filteredCards.slice(offset, offset + limit);
		
		return {
			cards: paginatedCards,
			total: filteredCards.length,
		};
	}
	
	// Méthodes pour Supabase (à implémenter plus tard)
	private async createCardInSupabase(data: CreateCardData): Promise<Card> {
		// TODO: Implémenter la création dans Supabase
		throw new Error('Supabase integration not implemented yet');
	}
	
	private async getCardsFromSupabase(filters?: {
		channel?: string;
		card_type?: string;
		limit?: number;
		offset?: number;
	}): Promise<{ cards: Card[]; total: number }> {
		// TODO: Implémenter la récupération depuis Supabase
		throw new Error('Supabase integration not implemented yet');
	}
	
	// Méthodes utilitaires
	getStorageType(): 'memory' | 'supabase' {
		return config.useMemoryStorage ? 'memory' : 'supabase';
	}
	
	// Réinitialiser le stockage mémoire (pour les tests)
	resetMemoryStorage(): void {
		memoryCards = [];
		console.log('Memory storage reset');
	}
}
