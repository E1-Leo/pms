module.exports = {
  productionSourceMap: false,
  lintOnSave: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8060',   //代理接口
        changeOrigin: true
      }
    }
  }
}