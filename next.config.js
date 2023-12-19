// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig

module.exports = {
    images: {
      domains: ['images.unsplash.com'], // Add any other domains if necessary 
      remotePatterns: [
        {
          protocol: "https",
          hostname: "images.pexels.com",
          pathname: "**",
        },
      ],
    },
  };