/**
 * Created by fxc on 2015/11/2.
 * Email: ifxc@qq.com
 * blog: blog.ifxc.me
 */

var app = require('koa')(),
  router = require('koa-router')(),
  koaBody = require('koa-body')(),
  logger = require('koa-logger'),
  proxy = require('koa-proxy'),
  serve = require('koa-static'),
  validate = require('koa-validate'),
  session = require('koa-session'),
  Mock = require('mockjs'),
  program = require('commander'),
  Data = require('./data'),
  config = require('./config')();

var data = new Data();
app.proxy = true;
program.option('-h, --host<address>', 'set proxy host')
    .option('-p, --port<number>', 'set port')
    .option('-d, --dir<path>', 'set path')
    .parse(process.argv);

var Server = function (opt) {
  this.data = data;
  this.Mock = Mock;
  this.config = this.data.merge(config, opt||{});
  this.config.path = program['dir<path>'] || this.config.path;
  this.config.port = program['port<number>'] || this.config.port;
  this.config.proxy.host = program['host<address>'] || this.config.proxy.host;
  this.user = this.config.session.key;
  this.checkSession = this.config.session.isCheck;
  this.responseType = this.config.responseType;
};
Server.prototype = {
  start: function () {
    var apiData = data.getApiData(), key, config = this.config;
    var user = this.user;
    //session
    if(this.config.session.isCheck){
      app.keys = [user];
      app.use(session({
        key: 'session_id',
        maxAge: 3600 * 60 * 96,
        httpOnly: false
      }, app));
      router.get('/login/:u', koaBody, function *(next) {
        var u = this.params.u;
        if(user === u){
          this.session.user = u;
          this.body = data.merge(data.tpl, {data:'sign success'});
        }else {
          this.body = data.merge(data.tpl, {error:'sign error'});
        }
      });
    }
    //start info
    router.all('/', koaBody, function *(next) {
      this.body = 'The mock server start success!';
    });
    //api mock router
    for (key in apiData) {
      if (!apiData.hasOwnProperty(key)) continue;
      this.handle(key);
    }
    //app middleware
    app.use(logger())
        .use(validate())
        .use(router.routes())
        .use(router.allowedMethods())
        .use(serve(config.path))
        .use(proxy(config.proxy))
        .use(function *notFound(next) {
          if (this.status == 404) {
            this.body = {error: 404};
          }else {
            this.body = {error: 'sorry!'};
          }
        });
    app.listen(config.port, function () {
      console.log('Port'+config.port+'... started');
    });
  },
  // handle router
  handle: function (key) {
    var type = data.apiMethod[key];
    var user = this.user, 
        check = this.checkSession, 
        tpl = this.data.tpl,
        responseType = this.responseType;
    if(type === 'post'){
      router.post(config.apiPrefix+key, koaBody, function *(next) {
        responseRes.call(this);
      });
    }
    if(type === 'get'){
      router.get(config.apiPrefix+key, koaBody, function *(next) {
        responseRes.call(this);
      });
    }
    function responseRes() {
      var body;
      //if has session,check this
      if(check && user !== this.session.user){
        body = data.merge(tpl, {error:"session error or exception!"});
        this.body = responseType==='text' ? JSON.stringify(body):body;
        return;
      }
      //check field,response error
      if(data.getCheck(key)) body = data.getCheck(key)(this, key);
      //response data
      if(!body) body = data.get(key);
      this.body = responseType==='text' ? JSON.stringify(body):body;
    }
  }
};

module.exports = Server;
