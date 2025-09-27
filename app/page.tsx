"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavigationArrow from '../src/components/NavigationArrow';

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
			<NavigationArrow href="/" className="hidden" />
			<div className="w-full max-w-4xl">
				{/* Header */}
				<div className="text-center mb-12">
                           <h1 className="text-6xl font-extrabold text-white mb-6">
                               ClosingHub
                           </h1>
                           <p className="text-xl text-white/80 max-w-2xl mx-auto">
                               Connect the best Closers with Entrepreneurs looking to grow their business
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
                                       <h2 className="text-3xl font-extrabold mb-4">I am a Closer</h2>
                                       <p className="text-white/70 mb-6 leading-relaxed">
                                           I'm looking for collaboration opportunities with companies. 
                                           I want to create my profile and be visible to recruiters.
                                       </p>
                                       <div className="w-full py-3 rounded-[25px] font-semibold text-black text-center transition-all duration-300 group-hover:shadow-lg"
                                           style={{
                                               background: "linear-gradient(90deg, #8CFF8E 0%, #00FF04 45%, #0FBF0F 100%)",
                                               boxShadow: "0 10px 30px rgba(0,255,4,0.28), inset 0 1px 0 rgba(255,255,255,0.35)",
                                           }}
                                       >
                                           Create my profile
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
                                       <h2 className="text-3xl font-extrabold mb-4">I am a Company</h2>
                                       <p className="text-white/70 mb-6 leading-relaxed">
                                           I'm looking for talented Closers to grow my business. 
                                           I want to publish job offers and recruit the best profiles.
                                       </p>
                                       <div className="w-full py-3 rounded-[25px] font-semibold text-black text-center transition-all duration-300 group-hover:shadow-lg"
                                           style={{
                                               background: "linear-gradient(90deg, #8CFF8E 0%, #00FF04 45%, #0FBF0F 100%)",
                                               boxShadow: "0 10px 30px rgba(0,255,4,0.28), inset 0 1px 0 rgba(255,255,255,0.35)",
                                           }}
                                       >
                                           Publish an offer
                                       </div>
							</div>
						</div>
					</div>
				</div>

				{/* Features */}
                       <div className="mt-16 text-center">
                           <h3 className="text-2xl font-bold text-white mb-8">How does it work?</h3>
                           <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                               <div className="text-white/80">
                                   <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                                       <span className="text-2xl">1️⃣</span>
                                   </div>
                                   <h4 className="font-semibold mb-2">Choose your role</h4>
                                   <p className="text-sm">Closer or Company</p>
                               </div>
                               <div className="text-white/80">
                                   <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                                       <span className="text-2xl">2️⃣</span>
                                   </div>
                                   <h4 className="font-semibold mb-2">Create your profile/offer</h4>
                                   <p className="text-sm">Fill out the appropriate form</p>
                               </div>
                               <div className="text-white/80">
                                   <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                                       <span className="text-2xl">3️⃣</span>
                                   </div>
                                   <h4 className="font-semibold mb-2">Connect</h4>
                                   <p className="text-sm">Find your perfect match</p>
                               </div>
                           </div>
                       </div>
			</div>
		</div>
	);
}
