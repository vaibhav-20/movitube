const wbpackCommon = require("./webpack.common");
const { merge } = require("webpack-merge");

module.exports = (envVariables) => {
  const { env } = envVariables;

  const webpackFileToUse = require(`./webpack.${env.trim()}.js`);

  return merge(wbpackCommon, webpackFileToUse);
};
