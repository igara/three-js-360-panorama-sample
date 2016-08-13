var webpack = require("webpack");
module.exports = {
    plugins: [],
    entry: {
        // build対象
        index: __dirname + "/src/ts/index.ts",
        test:  __dirname + "/src/ts/test.ts",
        daimon:  __dirname + "/src/ts/daimon.ts",
    },
    output: {
        // 出力先のディレクトリを指定する
        path: __dirname + "/dist/js",
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