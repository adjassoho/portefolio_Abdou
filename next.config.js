/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Configurez le répertoire de sortie pour Vercel
  distDir: '.next',
  // Assurez-vous que les images peuvent être chargées depuis les sources externes
  images: {
    domains: ['github.com'],
    unoptimized: true,
  },
}

module.exports = nextConfig 