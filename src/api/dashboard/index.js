import request from '@/api/request'

function base(data) {
  return request({
    url: `/admin/xy/dashboard/base`,
    method: 'get',
    data: data

  })

}

export default {
  base
}
