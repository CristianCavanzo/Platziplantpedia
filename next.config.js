/** @type {import('next').NextConfig} */
const nextConfig = {
    /* config options here */
    images: {
        domains: ['images.ctfassets.net'],
    },
    i18n: {
        locales: ['en-US', 'es'],
        defaultLocale: 'en-US',
    },
};

module.exports = nextConfig;
