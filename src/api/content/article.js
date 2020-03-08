import request from '@/api/request'
// 新闻列表
function getNewList(data) {
  return request({
    url: '/admin/xy/news/list',
    method: 'get',
    data: data
  })
}
// 新增新闻
function addNewList(data) {
  return request({
    url: '/admin/xy/news/save',
    method: 'post',
    data: data
  })
}

//   修改新闻
function updateNewList(data) {
  return request({
    url: '/admin/xy/news/update',
    method: 'post',
    data: data
  })
}
//   删除新闻
function gdelNewList(data) {
  return request({
    url: '/admin/xy/news/del',
    method: 'get',
    data: data
  })
}
// 新闻详情
function detailNewList(data) {
  return request({
    url: '/admin/xy/news/detail',
    method: 'get',
    data: data
  })
}


export default {
  getNewList,
  addNewList,
  updateNewList,
  detailNewList,
  gdelNewList,
}
