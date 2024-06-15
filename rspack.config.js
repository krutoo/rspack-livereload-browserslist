import rspack from "@rspack/core";

export default {
  entry: {
    index: "./src/index.tsx",
  },
  output: {
    clean: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: "builtin:swc-loader",
        options: {
          sourceMap: true,
          jsc: {
            parser: {
              syntax: "typescript",
              jsx: true,
            },
            transform: {
              react: {
                runtime: "automatic",
              },
            },
          },
        },
        type: "javascript/auto",
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      scriptLoading: "module",
      inject: "body",
    }),
    new rspack.CopyRspackPlugin({
      patterns: [
        {
          from: "public",
          to: "public",
        },
      ],
    }),
  ],
  experiments: {
    outputModule: true,
  },
  devServer: {
    liveReload: true,
    hot: false,
  },
};
