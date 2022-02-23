module.exports = {
    images: {
        domains: ['via.placeholder.com'],
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/blog',
                permanent: false,
            },
        ];
    },
};
