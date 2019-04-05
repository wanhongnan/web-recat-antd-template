
import getDefaultConfig from "./webpack/webpack.config.default";
import configureDev from "./webpack/webpack.builder.dev";
import configureProd from "./webpack/webpack.builder.prod";

export default (env, options) => {
    const devMode = options.mode !== "production";

    var webpackConfig = getDefaultConfig();
    if (devMode) {
        configureDev(webpackConfig);
    }
    else {
        configureProd(webpackConfig);
    }

    return webpackConfig;
}
