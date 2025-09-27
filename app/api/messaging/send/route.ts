import { NextRequest, NextResponse } from 'next/server';
import { WhopMessagingService } from '../../../../src/lib/whopMessaging';

const messagingService = WhopMessagingService.getInstance();

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		
		// Validation des données
		if (!body.toUserId || !body.cardId || !body.messageType) {
			return NextResponse.json(
				{ error: 'Missing required fields: toUserId, cardId, messageType' },
				{ status: 400 }
			);
		}
		
		// Vérifier que l'utilisateur peut envoyer des messages
		const canSend = await messagingService.canSendMessage();
		if (!canSend) {
			return NextResponse.json(
				{ error: 'User not authorized to send messages' },
				{ status: 403 }
			);
		}
		
		// Récupérer les données de la carte (simulation)
		// Dans un vrai projet, vous récupéreriez cela depuis votre base de données
		const cardData = {
			title: body.cardTitle || 'Carte sans titre',
			meta: body.cardMeta || {},
			cardType: body.cardType || 'closer_profile'
		};
		
		// Obtenir le template de message
		const template = messagingService.getTemplate(body.messageType);
		
		// Envoyer le message
		const result = await messagingService.sendMessage({
			toUserId: body.toUserId,
			template,
			cardData
		});
		
		if (result.success) {
			console.log('Message envoyé avec succès:', result.messageId);
			return NextResponse.json({
				success: true,
				messageId: result.messageId,
				message: 'Message envoyé avec succès'
			});
		} else {
			return NextResponse.json(
				{ error: result.error || 'Erreur lors de l\'envoi du message' },
				{ status: 500 }
			);
		}
	} catch (error) {
		console.error('Error sending message:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}
