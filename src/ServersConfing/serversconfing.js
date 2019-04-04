/**
 * Created by Administrator on 2018/2/5 0005.
 * 接口配置文件
 */
import axios from 'axios';
import md5 from 'js-md5'; //md5加密
import { Toast } from 'vant';
import { Dialog } from 'vant';
//import qs from 'qs' ;
const Md5Key = 'dsj_nync'; //服务器md5key
const httpUrl = "http://192.168.1.120:10100/"; //服务器地址
const serveraddress = httpUrl + 'apiMD5?parameters=Function=';
function AjaxHttp(params, response, error) {
    axios.get(serveraddress + params)
        .then(function (e) {
            if (response) {
                response(e)
            }
        })
        .catch(function (e) {
            if (error) {
                error(e)
            }
        })
}

export {AjaxHttp, Md5Key,serveraddress,Toast,Dialog, md5}


