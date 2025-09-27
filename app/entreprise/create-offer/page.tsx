import FormEntreprise from '../../../src/components/FormEntreprise';
import NavigationArrow from '../../../src/components/NavigationArrow';

export default function CreateOffer() {
        return (
                <main className="min-h-[calc(100dvh-4rem)] flex items-center justify-center p-6">
                        <NavigationArrow href="/entreprise" />
                        <FormEntreprise />
                </main>
        );
}



