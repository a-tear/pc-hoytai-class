import request from '@/api/request'
// 图片列表
function getImgsList(data) {
  return request({

    url: '/admin/xy/upload/list',
    method: 'post',
    data: data
  })
}
// 上传图片
function uploadImgs(data) {
  return request({

    url: '/admin/xy/upload/uploadImg',
    method: 'post',
    data: data
  })
}
// 更新标题
function uploadTitle(data) {
  return request({

    url: '/admin/xy/upload/updateTitle',
    method: 'post',
    data: data
  })
}
// 删除图片
function delImgs(data) {
  return request({

    url: '/admin/xy/upload/del',
    method: 'get',
    data: data
  })
}




export default {
  getImgsList,
  uploadImgs,
  uploadTitle,
  delImgs
}
