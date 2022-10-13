const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const Dotenv = require("dotenv-webpack");
const path = require("path");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "akinsgre",
    projectName: "kayak-strava-navbar",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    plugins: [
      new Dotenv({
<<<<<<< Updated upstream
        path: `./.env${
          webpackConfigEnv.development === true ? ".development" : ""
        }`,
=======
        path: path.resolve(__dirname, `${
          webpackConfigEnv.development  ? ".env.development" : ".env"
        }`),
>>>>>>> Stashed changes
      }),
    ],
  });

};
