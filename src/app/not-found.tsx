import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Page non trouvée</h2>
      <p className="text-gray-600 mb-8">
        La page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
        Retour à l'accueil
      </Link>
    </div>
  );
} 