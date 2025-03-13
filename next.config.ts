import { config as dotenvConfig } from "dotenv"
import type { NextConfig } from "next"
dotenvConfig()

console.log("NODE Env: ", process.env.NODE_ENV)

const nextConfig: NextConfig = {
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })

    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  reactStrictMode: false,
}

export default nextConfig
