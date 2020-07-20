module.exports = {
    // 基本路径
    publicPath: "/",
    // 输出文件目录
    outputDir: "dist",
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: () => { },
    configureWebpack: () => { },
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: true,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require("os").cpus().length > 1,
    devServer: {
        port: 2365,
        proxy: {
            // 配置多个代理
            "/zhwtf/blogShow": {
                target: "http://106.53.223.87:8088/",//这里改成你自己的后端api端口地址，记得每次修改，都需要重新build
                //target: "http://localhost:58427",
                //target: "http://api.douban.com",
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    // 路径重写，
                    "^/apb": "" // 替换target中的请求地址
                }
            },
            "/images": {
                target: "http://localhost:8081",
            }
        },
        before: app => { }
    },
    lintOnSave: false
}
