import path from "path";
// Types
import type { Configuration } from "webpack";

const webpackConfig: Configuration = {
  mode: "production",
  entry: "./src/index.ts",
  output: {
    filename: "index.js",
    library: {
      type: "module",
    },
    path: path.resolve(__dirname, "dist"),
  },
  experiments: {
    outputModule: true,
  },
  optimization: {
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: true,
                localIdentName: "[hash:base64]",
              },
              sourceMap: true,
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.tsx?$/i,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            compilerOptions: {
              sourceMap: true,
            },
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  }
};

export default webpackConfig;
