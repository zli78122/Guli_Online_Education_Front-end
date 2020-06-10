import request from '@/utils/request'

export default {
    // 添加课程信息
    addCourseInfo(courseInfo) {
        return request({
            url: '/eduservice/course/addCourseInfo',
            method: 'post',
            data: courseInfo
        })
    },
    // 查询所有讲师
    getListTeacher() {
        return request({
            url: '/eduservice/teacher/findAll',
            method: 'get'
        })
    },
    // 根据课程id查询课程基本信息
    getCourseInfoId(id) {
        return request({
            url: '/eduservice/course/getCourseInfo/' + id,
            method: 'get'
        })
    },
    // 修改课程信息
    updateCourseInfo(courseInfo) {
        return request({
            url: '/eduservice/course/updateCourseInfo',
            method: 'post',
            data: courseInfo
        })
    },
    // 根据课程id查询课程确认信息
    getPublihCourseInfo(id) {
        return request({
            url: '/eduservice/course/getPublishCourseInfo/' + id,
            method: 'get'
        })
    },
    // 课程最终发布
    publihCourse(id) {
        return request({
            url: '/eduservice/course/publishCourse/' + id,
            method: 'post'
        })
    },
    // 查询所有课程
    getListCourse() {
        return request({
            url: '/eduservice/course/findAll',
            method: 'get'
        })
    },
    // 删除课程
    deleteCourseById(id) {
        return request({
            url: `/eduservice/course/${id}`,
            method: 'delete'
        })
    },
    // 分页条件查询课程
    // current:当前页   limit:每页记录数   courseQuery:条件对象
    getCourseListPage(current, limit, courseQuery) {
        return request({
            url: `/eduservice/course/pageCourseCondition/${current}/${limit}`,
            method: 'post',
            //  courseQuery条件对象，后端使用RequestBody获取数据
            //  data表示把对象转换成json，然后传递到后端接口里面
            data: courseQuery
        })
    }
}
