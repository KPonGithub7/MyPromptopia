/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
        remotePatterns: [
            {
                hostname: "*",
                // domain: ["lh3.googleusercontent.com"],
            },
        ],
    },
    headers: [
        {
            source: "/api/prompt",
            headers: [
                {
                    key: "Access-Control-Allow-Methods",
                    value: "GET",
                },
                {
                    key: "Access-Control-Allow-Origin",
                    value: "https://my-promptopia-alpha.vercel.app/",
                },
            ],
        },
    ],
    webpack(config) {
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
        };
        return config;
    },
};

module.exports = nextConfig;
