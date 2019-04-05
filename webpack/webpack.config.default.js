
import { resolve } from "./utils";
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { loader as minicssLoader } from "mini-css-extract-plugin";
import webpack from "webpack";
import PageSettings from "./pages";

const dist = "dist";

var webpackConfig = {
    entry: {},
    output: {
        path: resolve(dist)
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.json5', 'sass', 'css', 'scss','less'],
        modules: ["node_modules", "src", "scripts", "assets"]
    },
    plugins: [],
    externals: {},
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    resolve("src")
                ],
                loader: 'babel-loader',
                options: {
                    babelrc: true
                }
            },{
                test: /\.json5$/,
                loader: 'json5-loader',
            },{
                test: /\.(sa|sc|c)ss$/,
                use: [{
                    loader: minicssLoader,
                    options: {
                        fallback: "style-loader",
                        sourceMap: true,
                        publicPath: "../",
                    }
                }, {
                    loader: "css-loader",
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: "postcss-loader",
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true
                    }
                }]
            },{
                test: /\.(le)ss$/,
                use: [{
                    loader: minicssLoader,
                    options: {
                        fallback: "style-loader",
                        sourceMap: true,
                        publicPath: "../",
                    }
                }, {
                    loader: "css-loader",
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: "postcss-loader",
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: "less-loader",
                    options: {
                        sourceMap: true
                    }
                }]
            }, {
                test: /\.tsx?$/,
                use: ['ts-loader']
            }, {
                test: /\.(jpg|png|svg)$/,
                loader: "url-loader",
                options: {
                    limit: 8192,
                    name() {
                        return "images/[name].[ext]"
                    }
                }
            }, {
                test: /\.(woff|woff2|eot|ttf)$/,
                loader: "file-loader",
                options: {
                    limit: 8192,
                    name: "fonts/[name].[ext]"
                }
            }
        ]
    }
}

export default()=>{
    
    var copyFiles = [];
    Object.keys(PageSettings.extlib).forEach((libName)=>{
        var lib = PageSettings.extlib[libName];
        webpackConfig.externals[libName] = lib.var;
        copyFiles.push({
            from: resolve(lib.src),
            to: resolve(`${dist}/${lib.dist}`)
        });
    });
    copyFiles.push({
        from : resolve("src/assets/locales/*/*"),
        to : resolve(`${dist}/locales/`),
        transformPath : function(targePath, absolutePath) {
            var newPath = targePath.replace('src\\assets\\locales\\','').replace('src/assets/locales/','');
            //console.log(`targePath:${targePath} newPath:${newPath} absolutePath:${absolutePath}`)
            return Promise.resolve(newPath);
        }
    });
    webpackConfig.plugins.push(new CopyWebpackPlugin(copyFiles, {
         //logLevel: 'debug'
    }));

    return webpackConfig;
}
