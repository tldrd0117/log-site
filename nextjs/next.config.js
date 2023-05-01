/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  transpilePackages: ['@nivo/calendar', "@nivo/core"],
  webpack: (config) => {
    config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack']
    })  
    return config
  }
}

module.exports = nextConfig
