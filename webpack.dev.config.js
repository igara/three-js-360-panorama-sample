var webpack = require("webpack");
module.exports = {
    plugins: [],
    entry: {
        // build対象
        app: __dirname + "/src/ts/app.ts",
    },
    output: {
        // 出力先のディレクトリを指定する
        path: __dirname + "/dist",
        // 出力するファイル名
        filename: "[name].bundle.js",
    },
    devtool: "inline-source-map",
    resolve: {
        extensions: ["", ".ts", ".js"],
    },
    module: {
        loaders: [
            // testに書いた正規表現にマッチするファイルをloaderに投げる
            // loaderを複数指定したときには右から左に適用される
            // http://dackdive.hateblo.jp/entry/2016/04/13/123000#moduleloaders
            { test: /\.ts$/, loader: "ts-loader" },
            //
            { test: /\.(jpg|png)$/, loaders: "file?name=[path][name].[ext]"}
        ],
    },
};