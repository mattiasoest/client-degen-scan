const path = require("path");
const webpack = require("webpack");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  turbopack: {
    root: __dirname,
  },
  webpack: (config, { dev }) => {
    if (!dev) {
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(
          /[/\\]dev[/\\]loadDummyListings(\.ts|\.js)?$/,
          path.resolve(__dirname, "dev/loadDummyListings.stub.ts")
        )
      );
    }
    return config;
  },
};

module.exports = nextConfig;
