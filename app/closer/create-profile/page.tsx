import FormCloser from '../../../src/components/FormCloser';
import NavigationArrow from '../../../src/components/NavigationArrow';

export default function CreateCloserProfile() {
        return (
                <main className="min-h-[calc(100dvh-4rem)] flex items-center justify-center p-6">
                        <NavigationArrow href="/closer" />
                        <FormCloser />
                </main>
        );
}



