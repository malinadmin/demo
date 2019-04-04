import service from './request'
//登陆
export const login = data => {
    return service({
        url: '/rest/user/login',
        method:'post',
        data
    })
};
//获取用户信息
export const userinfo = data => {
  return service({
    url: 'rest/user/detail',
    method:'get',
    data
  })
};

