import axios from "axios";
import qs from "qs";
import {Md5Key, md5} from '@/ServersConfing/serversconfing';
import {Toast} from 'vant';

/****** 创建axios实例 ******/
const service = axios.create({
  baseURL: "http://192.168.1.120:10100",  // api的base_url http://211.149.149.248:8025测试
  timeout: 5000 , // 请求超时时间
});

/****** request拦截器==>对请求参数做处理 ******/
service.interceptors.request.use(config => {
  Toast.loading({
    duration: 0,       // 持续展示 toast
    forbidClick: true, // 禁用背景点击
    message: '加载中...'
  });
  const md5object = config.data;
  const form_data = makeFormData(md5object) //截取键值对的值统一处理md5
  const arrys = []
  for (let arry of form_data){
    arrys.push(arry.value)
  }
  const joinmd5key =md5(arrys.join('') + Md5Key)
  md5object.MD5 = joinmd5key
  config.method === 'post'
    ? config.data = qs.stringify({...md5object})
    : config.params = {...md5object};
    //设置token
    if(localStorage.getItem('TOKEN')){
      config.headers['Authorization']= 'Bearer ' + localStorage.getItem('TOKEN')
    }
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
  return config;
}, error => {  //请求错误处理
  Toast.fail(error);
  Promise.reject(error)
});


/****** respone拦截器==>对响应做处理 ******/
service.interceptors.response.use(
  response => {  //成功请求到数据
    Toast.clear();
    if (response.data.code === 200) {
      return response.data;
    } else {
      Toast.fail(response.data.info);
    }
  },
  error => {  //响应错误处理
    Toast.clear();
    console.log('error');
    console.log(error);
    console.log(JSON.stringify(error));
    let text = JSON.parse(JSON.stringify(error)).response.code === 404
      ? '404'
      : '网络异常，请重试';
    Toast.fail(text);
    return Promise.reject(error)
  }
);
function makeFormData(obj, form_data) {
  var data = [];
  if (obj instanceof File) {
    data.push({ key: "", value: obj });
  }
  else if (obj instanceof Array) {
    for (var j = 0, len = obj.length; j < len; j++) {
      var arr = makeFormData(obj[j]);
      for (var k = 0, l = arr.length; k < l; k++) {
        var key = !!form_data ? j + arr[k].key : "[" + j + "]" + arr[k].key;
        data.push({ key: key, value: arr[k].value })
      }
    }
  }
  else if (typeof obj == 'object') {
    for (var j in obj) {
      var arr = makeFormData(obj[j]);
      for (var k = 0, l = arr.length; k < l; k++) {
        var key = !!form_data ? j + arr[k].key : "[" + j + "]" + arr[k].key;
        data.push({ key: key, value: arr[k].value })
      }
    }
  }
  else {
    data.push({ key: "", value: obj });
  }
  if (!!form_data) {
    // 封装
    for (var i = 0, len = data.length; i < len; i++) {
      form_data.append(data[i].key, data[i].value)
    }
  }
  else {
    return data;
  }
}
export default service;
