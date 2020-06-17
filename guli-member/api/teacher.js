import request from '@/utils/request'

export default {
  // 分页查询讲师
  //   page : 当前页码
  //   limit : 每页显示的数据条数
  getTeacherList(page, limit) {
    return request({
      url: `/eduservice/teacherfront/getTeacherFrontList/${page}/${limit}`,
      method: 'post'
    })
  },
  // 根据讲师id查询讲师详情
  getTeacherInfo(id) {
    return request({
      url: `/eduservice/teacherfront/getTeacherFrontInfo/${id}`,
      method: 'get'
    })
  }
}