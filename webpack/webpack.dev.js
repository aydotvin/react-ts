const { merge, mergeWithRules } = require("webpack-merge");
const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const commonConfig = require("./webpack.common.js");

module.exports = (envs, args) => {
  const { flag1 = "defaultvalue" } = envs;

  const devConfig = {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
      hot: true,
      open: true,
      port: 9000,
      historyApiFallback: true,
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.flag1": JSON.stringify(flag1),
      }),
      new ReactRefreshWebpackPlugin(),
    ],

    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  auto: true,
                  localIdentName: "[name]__[local]",
                },
              },
            },
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  auto: true,
                  localIdentName: "[name]__[local]",
                },
              },
            },
            "sass-loader",
          ],
        },
      ],
    },
  };

  return mergeWithRules({
    module: {
      rules: {
        test: "match",
        use: {
          loader: "match",
          options: "replace",
        },
      },
    },
  })(commonConfig, devConfig);
};
