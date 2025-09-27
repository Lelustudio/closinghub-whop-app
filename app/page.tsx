"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
	const [selectedRole, setSelectedRole] = useState<'closer' | 'entreprise' | null>(null);
	const router = useRouter();

	const handleRoleSelection = (role: 'closer' | 'entreprise') => {
		setSelectedRole(role);
		// Redirection basée sur le rôle
		if (role === 'closer') {
			router.push('/closer');
		} else {
			router.push('/entreprise');
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center p-6">
			<div className="w-full max-w-4xl">
				{/* Header */}
				<div className="text-center mb-12">
					<h1 className="text-6xl font-extrabold text-white mb-6">
						ClosingHub
					</h1>
					<p className="text-xl text-white/80 max-w-2xl mx-auto">
						Connectez les meilleurs Closers avec les Entrepreneurs qui cherchent à développer leur business
					</p>
				</div>

				{/* Role Selection Cards */}
				<div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
					{/* Closer Card */}
					<div 
						className="group cursor-pointer transition-all duration-300 hover:scale-105"
						onClick={() => handleRoleSelection('closer')}
					>
						<div
							className="rounded-[25px] text-white p-8 shadow-xl border border-neutral-700 h-full"
							style={{
								background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 100%)",
							}}
						>
							<div className="flex flex-col items-center text-center">
								<div className="w-20 h-20 rounded-full border-4 border-blue-500 bg-neutral-900 grid place-items-center overflow-hidden mb-6">
									<img 
										src="/images/closer-icon.svg" 
										alt="Closer" 
										className="w-16 h-16 object-contain"
									/>
								</div>
								<h2 className="text-3xl font-extrabold mb-4">Je suis un Closer</h2>
								<p className="text-white/70 mb-6 leading-relaxed">
									Je cherche des opportunités de collaboration avec des entreprises. 
									Je veux créer mon profil et être visible pour les recruteurs.
								</p>
								<div className="w-full py-3 rounded-[25px] font-semibold text-black text-center transition-all duration-300 group-hover:shadow-lg"
									style={{
										background: "linear-gradient(90deg, #8CFF8E 0%, #00FF04 45%, #0FBF0F 100%)",
										boxShadow: "0 10px 30px rgba(0,255,4,0.28), inset 0 1px 0 rgba(255,255,255,0.35)",
									}}
								>
									Créer mon profil
								</div>
							</div>
						</div>
					</div>

					{/* Entreprise Card */}
					<div 
						className="group cursor-pointer transition-all duration-300 hover:scale-105"
						onClick={() => handleRoleSelection('entreprise')}
					>
						<div
							className="rounded-[25px] text-white p-8 shadow-xl border border-neutral-700 h-full"
							style={{
								background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 100%)",
							}}
						>
							<div className="flex flex-col items-center text-center">
								<div className="w-20 h-20 rounded-full border-4 border-blue-500 bg-neutral-900 grid place-items-center overflow-hidden mb-6">
									<img 
										src="/images/entreprise-icon.svg" 
										alt="Entreprise" 
										className="w-16 h-16 object-contain"
									/>
								</div>
								<h2 className="text-3xl font-extrabold mb-4">Je suis une Entreprise</h2>
								<p className="text-white/70 mb-6 leading-relaxed">
									Je cherche des Closers talentueux pour développer mon business. 
									Je veux publier des offres et recruter les meilleurs profils.
								</p>
								<div className="w-full py-3 rounded-[25px] font-semibold text-black text-center transition-all duration-300 group-hover:shadow-lg"
									style={{
										background: "linear-gradient(90deg, #8CFF8E 0%, #00FF04 45%, #0FBF0F 100%)",
										boxShadow: "0 10px 30px rgba(0,255,4,0.28), inset 0 1px 0 rgba(255,255,255,0.35)",
									}}
								>
									Publier une offre
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Features */}
				<div className="mt-16 text-center">
					<h3 className="text-2xl font-bold text-white mb-8">Comment ça marche ?</h3>
					<div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
						<div className="text-white/80">
							<div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
								<span className="text-2xl">1️⃣</span>
							</div>
							<h4 className="font-semibold mb-2">Choisissez votre rôle</h4>
							<p className="text-sm">Closer ou Entreprise</p>
						</div>
						<div className="text-white/80">
							<div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
								<span className="text-2xl">2️⃣</span>
							</div>
							<h4 className="font-semibold mb-2">Créez votre profil/offre</h4>
							<p className="text-sm">Remplissez le formulaire adapté</p>
						</div>
						<div className="text-white/80">
							<div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
								<span className="text-2xl">3️⃣</span>
							</div>
							<h4 className="font-semibold mb-2">Connectez-vous</h4>
							<p className="text-sm">Trouvez votre match parfait</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
