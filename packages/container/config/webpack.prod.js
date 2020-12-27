const {merge} = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonFig = require("./webpack.common");
const packageJson = require("../package.json");

const domain = process.env.PRODUCTION_DOMNAIN;

const prodConfig = {
    mode: "production",
    output: {
        filename: "[name].[contenthash].js",
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "container",
            remotes: {
                marketing: `marketing@${domain}/marketing/remoteEntry.js`
            },
            shared: packageJson.dependencies,
        })
    ],
    
};

module.exports = merge(commonFig, prodConfig);