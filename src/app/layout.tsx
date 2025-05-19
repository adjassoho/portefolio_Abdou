import './globals.css';
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import ThemeProvider from '@/components/ThemeProvider';

// Configuration des polices
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'SAIBOU ABDOU SALAM | Portfolio',
  description: 'Étudiant en Bachelor Supply Chain en recherche de stage',
  keywords: 'portfolio, stage, Bachelor Supply Chain, achats, logistique, Rouen',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-white`}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <main className="flex-grow">
        {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
