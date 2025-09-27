"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import NavigationArrow from '../../src/components/NavigationArrow';

interface Message {
	id: string;
	from: string;
	to: string;
	subject: string;
	body: string;
	created_at: string;
	read: boolean;
}

export default function MessagesPage() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchMessages();
	}, []);

	const fetchMessages = async () => {
		try {
			// Simulation de récupération des messages
			// Dans un vrai projet, vous utiliseriez l'API Whop
			const mockMessages: Message[] = [
				{
					id: 'msg_1',
					from: 'user_123',
					to: 'current_user',
					subject: 'Interest in your Closer profile',
					body: 'Hello, I am interested in your Closer profile and would like to discuss a potential collaboration...',
					created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2h ago
					read: false
				},
				{
					id: 'msg_2',
					from: 'user_456',
					to: 'current_user',
					subject: 'Application for your job offer',
					body: 'Hello, I am interested in your job offer and would like to apply for this position...',
					created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5h ago
					read: true
				}
			];
			
			setMessages(mockMessages);
		} catch (error) {
			console.error('Error fetching messages:', error);
		} finally {
			setLoading(false);
		}
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		const now = new Date();
		const diff = now.getTime() - date.getTime();
		const hours = Math.floor(diff / (1000 * 60 * 60));
		
		if (hours < 1) return 'Less than 1h ago';
		if (hours < 24) return `${hours}h ago`;
		const days = Math.floor(hours / 24);
		return `${days} day${days > 1 ? 's' : ''} ago`;
	};

	return (
		<main className="min-h-screen p-6">
			<NavigationArrow href="/" />
			<div className="max-w-4xl mx-auto">
				{/* Header */}
				<div className="flex items-center justify-between mb-8">
					<div>
						<h1 className="text-4xl font-extrabold text-white mb-2">Messages</h1>
						<p className="text-white/70">Your conversations and interest messages</p>
					</div>
					<Link 
						href="/"
						className="px-4 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
					>
						← Back to home
					</Link>
				</div>

				{/* Navigation */}
				<div className="flex gap-4 mb-8">
					<Link 
						href="/closer"
						className="px-4 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
					>
						View Closer profiles
					</Link>
					<Link 
						href="/entreprise"
						className="px-4 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
					>
						View job offers
					</Link>
				</div>

				{/* Loading */}
				{loading && (
					<div className="text-center py-12">
						<p className="text-white/50">Loading messages...</p>
					</div>
				)}

				{/* Messages */}
				{!loading && messages.length > 0 && (
					<div className="space-y-4">
						{messages.map((message) => (
							<div 
								key={message.id}
								className={`rounded-[25px] p-6 shadow-xl border transition-all duration-300 hover:scale-[1.02] ${
									message.read 
										? 'bg-white/5 border-white/10' 
										: 'bg-green-500/10 border-green-500/30'
								}`}
								style={{
									background: message.read 
										? 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.8) 100%)'
										: 'linear-gradient(135deg, rgba(0,255,4,0.1) 0%, rgba(0,0,0,0.8) 100%)'
								}}
							>
								<div className="flex items-start justify-between mb-4">
									<div className="flex-1">
										<h3 className="text-lg font-semibold text-white mb-2">
											{message.subject}
											{!message.read && (
												<span className="ml-2 px-2 py-1 bg-green-500 text-black text-xs rounded-full">
													New
												</span>
											)}
										</h3>
										<p className="text-white/70 text-sm line-clamp-2">
											{message.body}
										</p>
									</div>
									<div className="text-right">
										<p className="text-white/50 text-xs">
											{formatDate(message.created_at)}
										</p>
									</div>
								</div>
								
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
											<span className="text-white text-sm font-semibold">
												{message.from.charAt(0).toUpperCase()}
											</span>
										</div>
										<span className="text-white/60 text-sm">
											From: {message.from}
										</span>
									</div>
									<button className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors text-sm">
										Reply
									</button>
								</div>
							</div>
						))}
					</div>
				)}

				{/* Empty state */}
				{!loading && messages.length === 0 && (
					<div className="text-center mt-12">
						<div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center">
							<span className="text-4xl">💬</span>
						</div>
						<p className="text-white/50 text-lg mb-2">
							No messages at the moment
						</p>
						<p className="text-white/30 text-sm">
							Interest messages will appear here when someone is interested in your profiles or offers.
						</p>
					</div>
				)}
			</div>
		</main>
	);
}
