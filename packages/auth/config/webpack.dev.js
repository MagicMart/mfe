const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin")
const commonFig = require("./webpack.common")
const packageJson = require("../package.json");


const devConfig = {
    mode: "development",
    output: {
        publicPath: "http://localhost:8082/"
    },
    devServer: {
        port: 8082,
        historyApiFallback: {
            index: "index.html"
        },
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "auth",
            filename: "remoteEntry.js",
            exposes: {
                "./AuthApp": "./src/bootstrap.js"
            },
            shared: packageJson.dependencies,
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        })
    ]
}

module.exports = merge(commonFig, devConfig);
