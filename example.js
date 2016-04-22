/**
 * Created by fxc on 2016/4/21.
 * Email: ifxc@qq.com
 * Description: example
 */

var Server = require('./server');
var server = new Server({
    port: 3000, //server start port
    apiPrefix: '/api/mock/', //api prefix
    responseType: 'json', //api mock data response type.  json|text
    path:  '../', //static resource path. __dirname|C:\Users\fxc\Desktop\mywork
    session: {key: 'user', isCheck: false},  //session config
    proxy: {
        host:  'https://cnodejs.org',  //proxy address
        map: {   //proxy path mapping
            '/api/v1': '/api/v1'
        }
    }
});
var Mock = server.Mock, Random = Mock.Random;

//get request
server.data.set('number', {data: Mock.mock({"number|1-200": 100})}, 'get');
//validation field
server.data.set('user', {data: {id: Random.natural(1, 1000), email: Random.email()}});
server.data.setCheck('user', function (cx, key) {
    cx.checkBody('username').eq('admin', "username isn't eq admin!");
    if(cx.errors) return server.data.merge(server.data.tpl, {error: cx.errors});
});
//each request is random
server.data.set('user_info', function () {
    return {data: {
        id: Random.natural(1, 1000),
        username: Random.name(),
        name: Random.cname(),
        email: Random.email(),
        address: Random.county(true),
        description: Random.cparagraph()
    }};
});

server.start();