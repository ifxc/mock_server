## 一、Install & Run
### 1.node version
    node -v  //v0.11+

### 2.install package
    npm install mock_server

### 3.example
  ```js
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
  ```
        
### 4.run
    node example
* get => /api/mock/number  200
* post => /api/mock/user response: error mock data
* post => /api/mock/user
 request: {"username": "admin"}
 response: success mock data  
* post => /api/mock/user response: random mock data  
* get => /api/v1/topics response:porxy data
        
### 5.option
    example: node example.js -h http://192.168.1.199:48068 -p 3000 -d ../static
* -h,--host<address>  set proxy host
* -p,--port<number>  set server start port
* -d,--dir<path>  set proxy path

## 二、API
###1.Server#start()
    start server
###2.Data#setTpl(t)    
    set response data template
###3.Data#set(apiname, data, method)    
    set response api data
###4.Data#get(apiname)    
    get response api data
###5.Data#getApiData()      
    get all response api data
##6.Data#setCheck(apiname, function)
    set api data field validate function
##7.Data#getCheck(apiname, function)
    get api data field validate function
        
## 三、Other docs
* Mock.js  doc： http://mockjs.com/
* koa-validate  doc： https://github.com/RocksonZeta/koa-validate
