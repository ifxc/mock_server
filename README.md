## 安装
### 1.检查是否存在node环境与版本号
    node -v  //保证版本在v0.11以上

### 2.安装相关模块
    npm install --save-dev    //项目目录路径下

### 3.修改相关配置
* config.js  所有相关配置,可按需修改
* data.js  所有模拟数据,可按需修改    
        
### 4.运行服务
    node app
        
### 5.other
* index.html  表单提交key进行session签名设置cookie
* Mock.js 模拟数据生成器 文档：http://mockjs.com/
* koa-validate 数据验证 文档：https://github.com/RocksonZeta/koa-validate

### option
    example: node app.js -h http://192.168.1.199:48068 -p 3000 -d ../third_party/static
* -h, --host<address>: 设置代理地址(带端口)
* -p, --port<number>: 设置服务启动端口
* -d, --dir<path>: 设置html等静态资源访问的根路径

##  Example
### post请求可模拟验证，post->http://localhost:3000/api/mock/test
    req:
    {
        "email": "ifxc.me"
    }
    res:
    {
      "code": -1,
      "data": [
        {
          "email": "email格式不对"
        }
      ],
      "id": null,
      "msg": "操作失败"
    }
    
    req:
    {
        "email": "1993@ifxc.me"
    }
    res:
    {
      "data": "success!!!"
    }
### get->http://localhost:3000/api/mock/get_list