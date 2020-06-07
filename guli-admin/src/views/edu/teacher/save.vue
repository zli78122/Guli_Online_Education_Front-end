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

      <!-- 讲师头像 -->
      <el-form-item label="讲师头像">
        <!-- 头像缩略图 -->
        <pan-thumb :image="teacher.avatar"/>
        <!-- 文件上传按钮 -->
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像</el-button>

        <!--
            v-show：是否显示上传组件
            :key：类似于id，如果一个页面有多个图片上传控件，可以做区分
            :url：上传图片的后端url地址
            field="file"：<input type="file" name="file"/>
            @close：点击上传组件的关闭按钮触发的回调方法
            @crop-upload-success：图片上传成功后的回调方法
         -->
        <image-cropper
            v-show="imagecropperShow"
            :width="200"
            :height="200"
            :key="imagecropperKey"
            :url="BASE_API + '/eduoss/fileoss'"
            field="file"
            @close="close"
            @crop-upload-success="cropSuccess"/>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacherApi from '@/api/edu/teacher'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
    components: { ImageCropper, PanThumb }, //声明组件。声明之后才能使用
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
            imagecropperShow: false,            //上传文件的弹框组件是否显示
            imagecropperKey: 0,                 //文件上传组件key值，类似于id
            BASE_API: process.env.BASE_API,     //获取config/dev.env.js里面的请求根路径
            saveBtnDisabled: false              //保存按钮是否禁用
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
        // 点击上传组件的关闭按钮触发的回调方法
        close() {
            // 关闭上传弹框
            this.imagecropperShow = false
            // 初始化上传组件
            this.imagecropperKey = this.imagecropperKey + 1
        },
        // 图片上传成功后的回调方法
        cropSuccess(data) {
            // 关闭上传弹框
            this.imagecropperShow = false
            // 获取上传成功之后返回的图片存储地址
            this.teacher.avatar = data.url
            // 初始化上传组件
            this.imagecropperKey = this.imagecropperKey + 1
        },

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