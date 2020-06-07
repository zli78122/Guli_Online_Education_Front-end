<template>
  <div class="app-container">
    <div style="margin-bottom: 15px">添加讲师</div>
    
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name"/>
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" controls-position="right" min="0"/>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career"/>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
      </el-form-item>

      <!-- 讲师头像：TODO -->

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacherApi from '@/api/edu/teacher'

export default {
    data() {
        return {
            teacher: {
                name: '',
                sort: 0,
                level: 1,
                career: '',
                intro: '',
                avatar: ''
            },
            saveBtnDisabled: false  //保存按钮是否禁用
        }
    },
    // 页面渲染之前执行
    created() {
        this.init()
    },
    // 监听
    watch: {
        // 当路由发生变化，方法就会执行
        $route(to, from) {
            this.init()
        }
    },
    methods: {
        init() {
            // 获取路由参数对象：this.$route.params
            // 获取路由参数对象中的id参数值：this.$route.params.id

            // 路由中有id参数 => 修改操作
            if(this.$route.params && this.$route.params.id) {
                // 获取id值
                const id = this.$route.params.id
                // 根据id查询讲师
                this.getInfo(id)
            } else { //路由中没有id参数 => 添加操作
                // 清空表单
                this.teacher = {}
            }
        },
        // 根据id查询讲师
        getInfo(id) {
            teacherApi.getTeacherInfo(id)
                .then(response => {
                    this.teacher = response.data.teacher
                })
        },
        saveOrUpdate() {
            //  判断添加还是修改
            //  根据teacher是否有id
            if(!this.teacher.id) {
                this.saveTeacher() //添加
            } else {
                this.updateTeacher() //修改
            }
        },
        // 添加讲师
        saveTeacher() {
            teacherApi.addTeacher(this.teacher)
                .then(response => {
                    // 提示信息
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    });
                    // 路由跳转，回到列表页面
                    this.$router.push({path:'/teacher/table'})
                })
        },
        // 修改讲师
        updateTeacher() {
        teacherApi.updateTeacherInfo(this.teacher)
            .then(response => {
                // 提示信息
                this.$message({
                    type: 'success',
                    message: '修改成功!'
                });
                // 路由跳转，回到列表页面
                this.$router.push({path:'/teacher/table'})
            })
        }
    }
}
</script>