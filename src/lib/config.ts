// Configuration de l'application
export const config = {
	// Mode de stockage des données
	useMemoryStorage: process.env.NEXT_PUBLIC_USE_MEMORY_STORAGE === 'true' || !process.env.NEXT_PUBLIC_SUPABASE_URL,
	
	// Configuration Supabase
	supabase: {
		url: process.env.NEXT_PUBLIC_SUPABASE_URL,
		anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
	},
	
	// Configuration Whop
	whop: {
		apiKey: process.env.WHOP_API_KEY,
		appId: process.env.NEXT_PUBLIC_WHOP_APP_ID,
		agentUserId: process.env.NEXT_PUBLIC_WHOP_AGENT_USER_ID,
		companyId: process.env.NEXT_PUBLIC_WHOP_COMPANY_ID,
	},
	
	// Configuration de l'application
	app: {
		name: 'ClosingHub',
		description: 'Connectez les meilleurs Closers avec les Entrepreneurs',
		version: '1.0.0',
	},
};
