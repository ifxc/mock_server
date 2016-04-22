/**
 * Created by fxc on 2015/11/3.
 * Email: ifxc@qq.com
 * Description: api data model
 */

var Data = function () {
  var id = Math.ceil(Math.random()*1000*1000);
  this.apiData = {};
  this.apiMethod = {};
  this.checkMethod = {};
  this.tpl = {
    id: id,
    code: 200
  };
};
Data.prototype = {
  /**
   * @description set template
   * @param t object data
   */
  setTpl : function (t) {
    this.tpl = t;
  },
  /**
   * @description merge api data
   * @param tpl object data(merge object)
   * @param data object data(merged object)
   */
  merge : function (tpl, data) {
    var d = JSON.parse(JSON.stringify(tpl));
    for (var k in data){
      if(data.hasOwnProperty(k)) d[k] = data[k];
    }
    return d;
  },
  /**
   * @description set api data
   * @param key  api key
   * @param data  response data
   * @param method  'post'|'get'
   * @returns {Data}
   */
  set: function (key, data, method) {
    var tpl = this.tpl;
    if(typeof data === 'object'){
      this.apiData[key] = this.merge(tpl, data);
    }
    if(typeof data === 'function'){
      this.apiData[key] = data;
    }
    if(method){
      this.apiMethod[key] = method;
    } 
    if(!method && !this.apiMethod[key]){
      this.apiMethod[key] = 'post';
    }
    return this;
  },
  /**
   * @description get api data
   * @param k
   * @returns {{}}
   */
  get: function (k) {
    var data = this.apiData[k];
    console.log(data);
    if(data && typeof data === 'function'){
      data = this.merge(this.tpl, data());
    }
    return data;
  },
  /**
   * @description gat all api data
   * @returns {{}|*}
   */
  getApiData: function () {
    return this.apiData;
  },
  /**
   * @description set api field validate function
   * @param key
   * @param callback
   * @returns {Data}
   */
  setCheck: function (key, callback) {
    this.checkMethod[key] = callback;
    return this;
  },
  /**
   * @description get api field validate function
   * @param key
   * @returns {*}
   */
  getCheck: function (key) {
    return this.checkMethod[key];
  }
};

module.exports = Data;