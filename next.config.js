module.exports = {
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
