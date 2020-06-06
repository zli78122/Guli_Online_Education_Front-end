import request from '@/utils/request'

export default {
    // 讲师列表（条件查询分页）
    // current:当前页   limit:每页记录数   teacherQuery:条件对象
    getTeacherListPage(current, limit, teacherQuery) {
        return request({
            url: `/eduservice/teacher/pageTeacherCondition/${current}/${limit}`,
            method: 'post',
            //  teacherQuery条件对象，后端使用RequestBody获取数据
            //  data表示把对象转换成json，然后传递到后端接口里面
            data: teacherQuery
        })
    },

}