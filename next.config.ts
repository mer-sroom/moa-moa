import { NextConfig } from "next";
import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    domains: ["i.scdn.co"],
  },
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, context) => {
    if (context?.isServer) {
      // 서버 빌드 시 msw/browser 무시
      if (Array.isArray(config.resolve.alias)) {
        config.resolve.alias.push({ name: "msw/browser", alias: false });
      } else {
        config.resolve.alias["msw/browser"] = false;
      }
    } else {
      // 클라이언트 빌드 시 msw/node 무시
      if (Array.isArray(config.resolve.alias)) {
        config.resolve.alias.push({ name: "msw/node", alias: false });
      } else {
        config.resolve.alias["msw/node"] = false;
      }
    }

    // 'next-auth/index'를 'next-auth'로 매핑
    config.resolve.alias["next-auth/index"] = path.resolve(
      __dirname,
      "node_modules/next-auth"
    );

    return config;
  },
};

export default nextConfig;
