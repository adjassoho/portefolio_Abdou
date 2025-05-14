'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Une erreur s'est produite
      </h2>
      <p className="text-gray-700 mb-6 max-w-md">
        {error.message || "Quelque chose s'est mal passé. Veuillez réessayer plus tard."}
      </p>
      <div className="text-sm text-gray-500 mb-6">
        {error.digest && <p>Error ID: {error.digest}</p>}
      </div>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Réessayer
      </button>
    </div>
  );
} 