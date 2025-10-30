/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Server-side only config
  },
  publicRuntimeConfig: {
    // Client and server config
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10gb',
    },
  },
  webpack: (config) => {
    // Add any custom webpack configuration
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
    });
    return config;
  },
};

export default nextConfig;
