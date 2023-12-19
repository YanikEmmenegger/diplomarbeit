/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/app/diary',
                destination: '/app',
                permanent: true,
            },

        ];
    },
    images:{
        domains: [
            'images.openfoodfacts.org'
        ]
    }
}
module.exports = nextConfig
