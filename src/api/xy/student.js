import request from '@/api/request'

function getStudentList(data) {
  return request({
    url: `/admin/xy/student/list`,
    method: 'get',
    data: data

  })

}
// 新增学员
function saveStudentList(data) {
  return request({
    url: '/admin/xy/student/save',
    method: 'post',
    data: data
  })
}
// 更新学员
function updateStudent(data) {
  return request({
    url: '/admin/xy/student/update',
    method: 'post',
    data: data
  })
}
// 学员明细
function studentDetail(data) {
  return request({
    url: '/admin/xy/student/detail',
    method: 'get',
    data: data
  })
}
// 删除学员
function delStudent(data) {
  return request({
    url: '/admin/xy/student/del',
    method: 'get',
    data: data
  })
}


export default {
  getStudentList,
  saveStudentList,
  updateStudent,
  studentDetail,
  delStudent,

}
