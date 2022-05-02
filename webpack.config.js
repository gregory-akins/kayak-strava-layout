const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const Dotenv = require("dotenv-webpack");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "insomnia",
    projectName: "kayak-strava-layout",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    plugins: [new Dotenv()],
  });
};
