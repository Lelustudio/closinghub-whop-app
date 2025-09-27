import { config } from './config';

export interface MessageTemplate {
	subject: string;
	body: string;
	type: 'hire_interest' | 'apply_interest';
}

export interface SendMessageData {
	toUserId: string;
	template: MessageTemplate;
	cardData: {
		title: string;
		meta: Record<string, any>;
		cardType: 'closer_profile' | 'entreprise_offer';
	};
}

// Templates de messages automatiques
export const messageTemplates: Record<string, MessageTemplate> = {
	hire_interest: {
		subject: 'Intérêt pour votre profil Closer',
		body: `Bonjour,

Je suis intéressé(e) par votre profil de Closer et souhaiterais discuter d'une collaboration potentielle.

Profil qui m'intéresse :
- Nom : {display_name}
- Expérience : {experience}
- Disponibilité : {availability}
- Appels hebdomadaires : {weekly_calls}
- Panier moyen : {avg_cart}

Je serais ravi(e) d'échanger avec vous pour en savoir plus sur vos disponibilités et vos conditions.

Cordialement`,
		type: 'hire_interest'
	},
	apply_interest: {
		subject: 'Candidature pour votre offre d\'emploi',
		body: `Bonjour,

Je suis intéressé(e) par votre offre d'emploi et souhaiterais postuler pour ce poste.

Offre qui m'intéresse :
- Entreprise : {company_name}
- Expérience requise : {experience_required}
- Appels hebdomadaires : {weekly_calls}
- Panier moyen : {avg_cart}
- Commission : {commission}

Je serais ravi(e) d'échanger avec vous pour en savoir plus sur cette opportunité.

Cordialement`,
		type: 'apply_interest'
	}
};

export class WhopMessagingService {
	private static instance: WhopMessagingService;
	
	private constructor() {}
	
	public static getInstance(): WhopMessagingService {
		if (!WhopMessagingService.instance) {
			WhopMessagingService.instance = new WhopMessagingService();
		}
		return WhopMessagingService.instance;
	}
	
	// Envoyer un message via l'API Whop
	async sendMessage(data: SendMessageData): Promise<{ success: boolean; messageId?: string; error?: string }> {
		try {
			// Remplacer les variables dans le template
			const processedBody = this.processTemplate(data.template.body, data.cardData.meta);
			const processedSubject = this.processTemplate(data.template.subject, data.cardData.meta);
			
			// Pour l'instant, simuler l'envoi via l'API Whop
			// Dans un vrai projet, vous utiliseriez l'API Whop pour envoyer des messages
			const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
			
			console.log('Message Whop envoyé:', {
				toUserId: data.toUserId,
				subject: processedSubject,
				body: processedBody,
				messageId,
				cardData: data.cardData
			});
			
			// Simulation d'un délai d'API
			await new Promise(resolve => setTimeout(resolve, 1000));
			
			return {
				success: true,
				messageId
			};
		} catch (error) {
			console.error('Erreur lors de l\'envoi du message Whop:', error);
			return {
				success: false,
				error: 'Erreur lors de l\'envoi du message'
			};
		}
	}
	
	// Traiter un template avec les données de la carte
	private processTemplate(template: string, meta: Record<string, any>): string {
		let processed = template;
		
		// Remplacer les variables {variable} par les valeurs de meta
		Object.entries(meta).forEach(([key, value]) => {
			const placeholder = `{${key}}`;
			processed = processed.replace(new RegExp(placeholder, 'g'), String(value || 'N/A'));
		});
		
		return processed;
	}
	
	// Obtenir un template de message
	getTemplate(type: 'hire_interest' | 'apply_interest'): MessageTemplate {
		return messageTemplates[type];
	}
	
	// Vérifier si l'utilisateur peut envoyer des messages
	async canSendMessage(): Promise<boolean> {
		// Vérifier les permissions Whop
		// Pour l'instant, toujours autoriser
		return true;
	}
	
	// Obtenir l'historique des messages (simulation)
	async getMessageHistory(userId: string): Promise<any[]> {
		// Simulation d'un historique de messages
		return [
			{
				id: 'msg_1',
				from: 'user_123',
				to: userId,
				subject: 'Intérêt pour votre profil',
				body: 'Bonjour, je suis intéressé par votre profil...',
				created_at: new Date().toISOString(),
				read: false
			}
		];
	}
}
