"use client";
import { useState } from 'react';
import { z } from 'zod';

const schema = z.object({
        display_name: z.string().min(2),
        age: z.coerce.number().int().min(16).max(100),
        experience: z.enum(['Beginner', 'Advanced', 'Master']),
        availability: z.enum(['Half time', 'Full time']),
        weekly_calls: z.enum(['1-3', '4-8', '9-15', '+15']),
        avg_cart: z.enum(['-2k', '2k-5k', '5k-10k', '+10k']),
        commission: z.string().optional(),
        prime: z.boolean().default(false),
});

export default function FormCloser() {
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState<string | null>(null);

        async function onSubmit(formData: FormData) {
                setLoading(true);
                setError(null);
                const parsed = schema.safeParse(Object.fromEntries(formData as unknown as any));
                if (!parsed.success) {
                        setLoading(false);
                        setError('Please fill all fields correctly');
                        return;
                }
                
                // Version simplifiée - affichage des données
                console.log('Closer Profile Data:', parsed.data);
                alert(`Profile créé avec succès !\n\nNom: ${parsed.data.display_name}\nExpérience: ${parsed.data.experience}\nDisponibilité: ${parsed.data.availability}`);
                setLoading(false);
        }

        return (
                <div
                        className="w-full max-w-md rounded-[25px] text-white p-8 shadow-xl border border-neutral-700"
                        style={{
                                background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 100%)",
                        }}
                >
                        <div className="flex flex-col items-center gap-2">
                                <div className="w-16 h-16 rounded-full border-4 border-blue-500 bg-neutral-900 grid place-items-center overflow-hidden">
                                        <img 
                                                src="/images/closer-icon.svg" 
                                                alt="Closer" 
                                                className="w-12 h-12 object-contain"
                                        />
                                </div>
                                <h2 className="text-3xl font-extrabold">Closer profile</h2>
                                <p className="text-sm italic opacity-80 text-center">What type of collaboration do you have in mind?</p>
                        </div>

                        <form action={onSubmit} className="mt-7 space-y-6">
                                <div>
                                        <label className="block text-sm opacity-80">Name</label>
                                        <input name="display_name" placeholder="free text" className="mt-2 w-full px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-700 placeholder:italic" />
                                </div>
                                <div>
                                        <label className="block text-sm opacity-80">Age</label>
                                        <input name="age" type="number" placeholder="free text" className="mt-2 w-full px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-700 placeholder:italic" />
                                </div>

                                <fieldset>
                                        <legend className="text-sm opacity-80">Experience</legend>
                                        <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                                                <label className="flex items-center gap-2"><input type="radio" name="experience" value="Beginner" className="[accent-color:#00FF04]" /> Beginner</label>
                                                <label className="flex items-center gap-2"><input type="radio" name="experience" value="Advanced" className="[accent-color:#00FF04]" /> <span className="text-lime-400">Advanced</span></label>
                                                <label className="flex items-center gap-2"><input type="radio" name="experience" value="Expert" className="[accent-color:#00FF04]" /> Expert</label>
                                                <label className="flex items-center gap-2"><input type="radio" name="experience" value="Master" className="[accent-color:#00FF04]" /> Master</label>
                                        </div>
                                </fieldset>

                                <fieldset>
                                        <legend className="text-sm opacity-80">Part‑time – Full‑time</legend>
                                        <div className="mt-3 grid grid-cols-2 gap-4 text-sm italic">
                                                <label className="flex items-center gap-2"><input type="radio" name="availability" value="Half time" className="[accent-color:#00FF04]" /> <span className="not-italic opacity-80">Part‑time</span></label>
                                                <label className="flex items-center gap-2"><input type="radio" name="availability" value="Full time" className="[accent-color:#00FF04]" defaultChecked /> <span className="text-lime-400 not-italic">Full‑time</span></label>
                                        </div>
                                </fieldset>

                                <fieldset>
                                        <legend className="text-sm opacity-80">Weekly calls</legend>
                                        <div className="mt-3 grid grid-cols-4 gap-4 text-sm">
                                                {['1-3','4-8','9-15','+15'].map((opt) => (
                                                        <label key={opt} className="flex items-center gap-2"><input type="radio" name="weekly_calls" value={opt} className="[accent-color:#00FF04]" defaultChecked={opt==='4-8'} /> {opt}</label>
                                                ))}
                                        </div>
                                </fieldset>

                                <fieldset>
                                        <legend className="text-sm opacity-80">Average cart</legend>
                                        <div className="mt-3 grid grid-cols-4 gap-4 text-sm">
                                                {['-2k','2k-5k','5k-10k','+10k'].map((opt) => (
                                                        <label key={opt} className="flex items-center gap-2"><input type="radio" name="avg_cart" value={opt} className="[accent-color:#00FF04]" defaultChecked={opt==='5k-10k'} /> {opt}</label>
                                                ))}
                                        </div>
                                </fieldset>

                                <div>
                                        <label className="block text-sm opacity-80">Commission</label>
                                        <input name="commission" placeholder="free text" className="mt-2 w-full px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-700 placeholder:italic" />
                                </div>

                                <fieldset>
                                        <legend className="text-sm opacity-80">Bonus</legend>
                                        <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                                                <label className="flex items-center gap-2"><input type="radio" name="prime" value="true" className="[accent-color:#00FF04]" /> <span className="text-lime-400">Yes</span></label>
                                                <label className="flex items-center gap-2"><input type="radio" name="prime" value="false" className="[accent-color:#00FF04]" /> <span className="italic opacity-80">No</span></label>
                                        </div>
                                </fieldset>

                                {error ? <p className="text-red-400 text-sm">{error}</p> : null}

                                <button
                                        disabled={loading}
                                        className="mt-2 w-full py-3 rounded-[25px] font-semibold text-black disabled:opacity-50 transition-transform"
                                        style={{
                                                background: "linear-gradient(90deg, #8CFF8E 0%, #00FF04 45%, #0FBF0F 100%)",
                                                boxShadow: "0 10px 30px rgba(0,255,4,0.28), inset 0 1px 0 rgba(255,255,255,0.35)",
                                                border: "1px solid rgba(255,255,255,0.06)",
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 12px 34px rgba(0,255,4,0.35), inset 0 1px 0 rgba(255,255,255,0.45)")}
                                        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,255,4,0.28), inset 0 1px 0 rgba(255,255,255,0.35)")}
                                        onMouseDown={(e) => (e.currentTarget.style.transform = "translateY(1px)")}
                                        onMouseUp={(e) => (e.currentTarget.style.transform = "")}
                                >
                                        {loading ? 'Publishing…' : 'Publish closer profile'}
                                </button>
                        </form>
                </div>
        );
}



