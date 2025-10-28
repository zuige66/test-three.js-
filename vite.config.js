export default {
    root: './src',
  server: {
    port: 8080, // 修改端口
    proxy: { '/api': { target: 'http://backend.com' } } // 配置代理
  }
}