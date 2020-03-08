import request from '@/api/request'

function getCostList(data) {
  return request({
    url: `admin/xy/cost/list`,
    method: 'get',
    data: data

  })

}

export default {
  getCostList
}
