/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NODE_ENV === 'development' ? '.dev' : undefined,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'itechart-bsn.s3.amazonaws.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'staging.itechart.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'dev.itechart.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'ventionteams.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'seal-newyork.bbb.org',
        pathname: '**',
      },
    ],
    deviceSizes: [
      420, 576, 768, 900, 1040, 1080, 1300, 1420, 1600, 1760, 1920, 2480, 2920,
      3840,
    ],
    minimumCacheTTL: 31536000,
  },
  webpack: (config, { webpack }) => {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
        resource.request = resource.request.replace(/^node:/, '');
      }),
    );

    return config;
  },
};

export default nextConfig;
