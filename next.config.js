/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Assurez-vous que l'App Router est activé (par défaut dans Next.js 13+)
  experimental: {
    appDir: true,
  },
  // Configurez le répertoire de sortie pour Vercel
  distDir: '.next',
}

module.exports = nextConfig 