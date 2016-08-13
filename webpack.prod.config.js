var webpack = require("webpack");
module.exports = {
    plugins: [
        // minify
        new webpack.optimize.UglifyJsPlugin({
            // 変数を省略しない
            mangle:false,
            // ライセンスコメントは残す
            output:{comments: require('uglify-save-license')}
        })
    ],
    entry: {
        // build対象
        index: __dirname + "/src/ts/index.ts",
        test:  __dirname + "/src/ts/test.ts",
    },
    output: {
        // 出力先のディレクトリを指定する
        path: __dirname + "/dist/js",
        // 出力するファイル名
        filename: "[name].bundle.js",
    },
    resolve: {
        // requireやimportしたときに省略を自動的に補完してくれる拡張子の一覧
        // http://dackdive.hateblo.jp/entry/2016/04/13/123000#resolve
        extensions: ['', '.ts', '.js'],
    },
    module: {
        loaders: [
            // testに書いた正規表現にマッチするファイルをloaderに投げる
            // loaderを複数指定したときには右から左に適用される
            // http://dackdive.hateblo.jp/entry/2016/04/13/123000#moduleloaders
            { test: /\.ts$/, loader: 'ts-loader' },
            //
            { test: /\.(jpg|png)$/, loaders: 'file?name=[path][name].[ext]'}
        ],
    },
};