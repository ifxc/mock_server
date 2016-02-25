/**
 * Created by fxc on 2015/11/3.
 * Email: ifxc@qq.com
 * Description: 数据模拟case
 */

var Mock = require('mockjs');
var Random = Mock.Random;
function getData(data){
  return {
    'code' : 0,
    'id' : null,
    'msg': '操作成功',
    'data': data
  };
}

module.exports = function(){
  return {
    //错误信息
    errorTpl : {
      'code' : -1,
      'data' : 'error xxx...',
      'id' : null,
      'msg': '操作失败'
    },
    test : {
      data : 'success!!!'
    },

    /****************** API DATA*******************/
    get_list : getData([{"id":1,"name":"张三"}, {"id":2,"name":"李四"}])
  };
};