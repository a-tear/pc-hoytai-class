import request from '@/api/request'

function getDormList(data) {
  return request({
    url: '/admin/xy/dorm/list',
    method: 'get',
    data: data
  })
}
// 新增宿舍
function saveDormList(data) {
  return request({
    url: '/admin/xy/dorm/save',
    method: 'post',
    data: data
  })
}

// 更新宿舍
function updateDromList(data) {
  return request({
    url: '/admin/xy/dorm/save',
    method: 'post',
    data: data
  })
}
// 宿舍明细
function dormDetail(data) {
  return request({
    url: '/admin/xy/dorm/detail',
    method: 'get',
    data: data
  })
}
// 删除
function delDormList(data) {
  return request({
    url: '/admin/xy/dorm/del',
    method: 'get',
    data: data
  })
}

export default {
  getDormList,
  saveDormList,
  dormDetail,
  delDormList,
  updateDromList
}
