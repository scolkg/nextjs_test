/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/topics",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/topics`,
      },
    ];
  },
};

module.exports = nextConfig;
