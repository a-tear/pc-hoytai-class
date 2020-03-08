import request from '@/api/request'

function doLogin(data) {
  return request({
    url: `/admin/login/doLogin`,
    method: 'post',
    data: data

  })

}


function getUserInfo(data) {
  return request({
    url: `/admin/login/getUserInfo`,
    method: 'get',
    data: data

  })

}

function loginOut(data) {
  return request({
    url: `/admin/login/doLogOut`,
    method: 'get',
    data: data

  })

}

export default {
  doLogin,
  getUserInfo,
  loginOut
}
