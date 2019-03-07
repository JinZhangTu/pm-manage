module.exports = {
    devServer: {
        host: 'localhost',
        port: 9000,
        // https: false,
        // hotOnly: false,
        // disableHostCheck: true,
        // 参考文档：
        // https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
        // https://github.com/chimurai/http-proxy-middleware
        // https://www.cnblogs.com/zuoan-oopp/p/9101240.html
        // 设置代理，目的：支持跨域
        proxy: {
            // 设置代理名称，作为访问接口的前缀。
            '/api/': {
                target: 'http://localhost:3000', // 代理主机的目标地址
                changeOrigin: true, // 是否改变原始主机头信息。对于虚拟主机站点这个设置是必须的。
                pathRewrite: {
                    '^/api': '' // 路径重写，匹配到/api开头的全部换成
                }
            }
        }
    }
};