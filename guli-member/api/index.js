import request from '@/utils/request'

export default {
  // 查询最近8门课程和4个名师
  getIndexData() {
    return request({
      url: '/eduservice/index-front/index',
      method: 'get'
    })
  }
}