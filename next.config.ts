import { config as dotenvConfig } from "dotenv"
import type { NextConfig } from "next"
dotenvConfig()

console.log("env", process.env.HELLO)

const nextConfig: NextConfig = {
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })

    return config
  },
}

export default nextConfig
