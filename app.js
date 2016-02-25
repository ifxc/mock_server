/**
 * Created by fxc on 2015/11/2.
 * Email: ifxc@qq.com
 * Site: ifxc.me
 */

var app = require('koa')(),
  router = require('koa-router')(),
  koaBody = require('koa-body')(),
  logger = require('koa-logger'),
  proxy = require('koa-proxy'),
  serve = require('koa-static'),
  validate = require('koa-validate'),
  session = require('koa-session'),
  Data = require('./data')(),
  Config = require('./config')();


router.all('/', koaBody, function *(next) {
  this.body = 'Hello World!';
});

/****************** start check *******************/
var checkBody = {
  test: function () {
    this.checkBody('email').isEmail("email格式不对");
  }
};
/****************** end check *******************/

/****************** start API *******************/
for (var key in Data) {
  (function (api) {
    router.all(Config.apiPrefix + api, koaBody, function *(next) {
      console.log('正在请求...'+Config.apiPrefix + api);
      console.log(this.request.body);
      if (checkBody[api]) checkBody[api].call(this);
      Data.errorTpl.data = this.errors;
      this.body = this.errors ? Data.errorTpl : Data[api];
    });
  })(key);
}
/****************** end API *******************/

/*** session验证模拟 ***/
app.keys = Config.keys;
app.use(session({key: 'session_id', maxAge: 3600 * 60 * 96, httpOnly: false}, app));
router.post('/sign', koaBody, function *(next) {
  var sign = this.request.body.sign;
  var i = Config.keys.length, isSign = false;
  while (i--) {
    if (Config.keys[i] === sign) {
      isSign = true;
      break;
    } else {
      isSign = false;
    }
  }
  if (isSign) {
    this.session.views = 'yes';
    this.body = 'sign success';
  } else {
    this.body = 'sign error'
  }
});

app.use(validate())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(logger())
  .use(serve(Config.path))
  .use(proxy(Config.proxy))
  .use(function *notFound(next) {
    if (this.status == 404) {
      this.body = {error: 404};
    }
  });
app.listen(Config.port, function () {
  console.log('端口'+Config.port+'... started');
});

