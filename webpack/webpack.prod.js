const { merge } = require("webpack-merge");
const webpack = require("webpack");
const commonConfig = require("./webpack.common");

module.exports = (envs, args) => {
  const { flag1 = "defaultvalue" } = envs;

  const prodConfig = {
    mode: "production",
    devtool: "source-map",
    plugins: [
      new webpack.DefinePlugin({
        "process.env.flag1": JSON.stringify(flag1),
      }),
    ],
  };

  return merge(commonConfig, prodConfig);
};
