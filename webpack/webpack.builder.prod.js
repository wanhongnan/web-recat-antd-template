import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CleanWebpackPlugin from 'clean-webpack-plugin';
import PageSettings from "./pages";
import { resolve } from "./utils";
const dist = "dist";

export default (webpackConfig) => {
    webpackConfig.output = {
        ...webpackConfig.output,
        filename: "scripts/[name].[contenthash:8].js",
        chunkFilename: "scripts/[id].[contenthash:8].js"
    };

    webpackConfig.plugins.push(
        new MiniCssExtractPlugin({
            filename: "styles/[name].[contenthash:8].css"
        })
    );
    
    webpackConfig.plugins.push(
        new CleanWebpackPlugin(dist, {
            root: resolve("")
        })
    );

    const wrappedlist = Object.keys(PageSettings.lib.wrapped);
    wrappedlist.forEach((wrappedname) => {
        if (typeof webpackConfig.entry[wrappedname] === "undefined") {
            // 設置 entry
            webpackConfig.entry[wrappedname] = PageSettings.lib.wrapped[wrappedname];
        }
    });

    webpackConfig.optimization = {
        splitChunks: {
            maxAsyncRequests: Infinity,
            maxInitialRequests: Infinity,
            cacheGroups: {
                commonModules: {
                    name: "common-modules",
                    test: /[\\\/](node_modules)[\\\/]/,
                    chunks: "initial",
                    minChunks: 1,
                    reuseExistingChunk: true,
                    enforce: true
                }
            },
        },
        namedChunks: true
    }

    Object.keys(PageSettings.pages).forEach((name) => {
        // 3.1 宣告變數
        const page = PageSettings.pages[name];
        // 3.2 指定進入點檔名與對應的頁面程式碼
        webpackConfig.entry[name] = resolve(`src/${page.js}`);
        // 3.4 設定對應的 HTML 程式樣板
        // template : 指定樣版程式碼
        // chunks : 指定該樣版編譯時會引用的 chunk，以此為例，引用 page 本身與對應的共通函式庫 (第三方、manifest)
        // favicon : faviconw圖檔路徑，通過 webpack 引入同時可以生成 hash 值
        // chunksSortMode : 調整chunk的順序如同指定的列表
        const chunkList = ["common-modules", ...page.lib, name];
        var libs = Object.values(PageSettings.extlib).map((v)=>v.href);
        webpackConfig.plugins.push(new HtmlWebpackPlugin({
            filename: `${name}.html`,
            template: resolve(`src/${page.template}`),
            //favicon: resolve(CONFIG.PATHS.SOURCE.ROOT + "/" + `/${config.favicon}`),
            chunks: chunkList,
            chunksSortMode: (chunk1, chunk2) => {
                const index1 = chunkList.indexOf(chunk1.names[0]);
                const index2 = chunkList.indexOf(chunk2.names[0]);
                return index1 - index2;
            },
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
            title: "antd-template",
            libs: libs
        }));
    });
}
