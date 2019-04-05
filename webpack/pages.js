export default {
    lib: {
        wrapped: {
            "pkg-common-style": [
                "./node_modules/reset-css/sass/_reset.scss",
                "./node_modules/normalize.css/normalize.css",
                "./node_modules/antd/dist/antd.css"
            ],
            "pkg-layout-style": [
                "./src/assets/styles/index.sass",
            ]
        }
    },
    pages: {
        index: {
            js: "scripts/index.tsx",
            template: "assets/index.html",
            lib: ["pkg-common-style", "pkg-layout-style"]
        }
    },
    //外部引入的库
    extlib:{
        "moment" : {
            var : "moment",
            src : "node_modules/moment/min/moment-with-locales.js",
            dist : "static/moment.js",
            href : "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment-with-locales.min.js",
        },
        "react" : {
            var : "React",
            src : "node_modules/react/umd/react.profiling.min.js",
            dist : "static/react.js",
            href : "https://cdnjs.cloudflare.com/ajax/libs/react/16.8.6/umd/react.profiling.min.js",
        },
        "react-dom" : {
            var : "ReactDOM",
            src : "node_modules/react-dom/umd/react-dom.profiling.min.js",
            dist : "static/react-dom.js",
            href : "https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.8.6/umd/react-dom.profiling.min.js",
        },
        "react-router" : {
            var : "ReactRouter",
            src : "node_modules/react-router/umd/react-router.js",
            dist : "static/react-router.js",
            href : "https://cdnjs.cloudflare.com/ajax/libs/react-router/5.0.0/react-router.min.js",
        },
        "jquery" : {
            var : "jQuery",
            src : "node_modules/jquery/dist/jquery.js",
            dist : "static/jquery.js",
            href : "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js",
        },
        "antd" : {
            var : "antd",
            src : "node_modules/antd/dist/antd-with-locales.js",
            dist : "static/antd.js",
            href : "https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.1/antd-with-locales.js",
        }
    }
}

