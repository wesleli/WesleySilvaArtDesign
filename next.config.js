/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        typedRoutes: true
    },

    typescript: {
    
      },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                port: '',// Certifique-se de ajustar o pathname conforme necessário
            }, 
            {
                protocol: 'https',
                hostname: 'img.icons8.com',
                port: '',// Certifique-se de ajustar o pathname conforme necessário
            }
        ] // Adicione o domínio aqui
    },
}

module.exports = nextConfig
