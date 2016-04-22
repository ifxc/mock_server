/**
 * Created by ifxc on 2015/12/3.
 * Description: a config
 */

module.exports = function(){
  
  return {
    port: 3000, //server start port
    apiPrefix: '/api/mock/', //api prefix
    responseType: 'json', //api mock data response type.  json|text  
    path:  '../', //static resource path. __dirname|C:\Users\fxc\Desktop\mywork
    session: {key: 'user', isCheck: false},  //session config
    proxy: {
      host:  'https://cnodejs.org',  //proxy address
      map: {   //proxy path mapping

      }
    }
  }
};