/**
 * Created by ifxc on 2015/12/3.
 * Description: 相关配置
 */

module.exports = function(){
  return {
    port: 3000, //服务启动端口
    apiPrefix: '/api/mock/', //api前缀
    path: '../', //静态资源路径__dirname | C:\Users\fxc\Desktop\mywork
    keys: ['administration','admin','system','user','guest'],
    proxy: {
      host:  'http://192.168.1.201:48169',  //代理地址
      map: {   //代理路径映射
        '/mjson' : '/mjson',
        '/site_manager' : '/site_manager',
        '/wx_public' : '/wx_public',
        '/web' : '/web',
        '/web_img' : '/web_img',
        '/third_party' : '/third_party',
        '/third_image' : '/third_image',
        '/manager' : '/manager'
      }
    }
  }
};