<template>
  <div class="app-container">
    <h2 style="text-align: center;">Publish New Course</h2>

    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="Basic Information"/>
      <el-step title="Chapter Information"/>
      <el-step title="Publish"/>
    </el-steps>

    <el-form label-width="120px">
      <!-- 课程标题 -->
      <el-form-item label="Title">
        <el-input v-model="courseInfo.title" placeholder="Example: Machine learning project course: video course from basics to project construction."/>
      </el-form-item>

      <!-- 课程分类 -->
      <el-form-item label="Category">
        <el-select v-model="courseInfo.subjectParentId" placeholder="Primary" @change="subjectLevelOneChanged">
          <el-option
            v-for="subject in subjectOneList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"/>
        </el-select>

        <el-select v-model="courseInfo.subjectId" placeholder="Secondary">
          <el-option
            v-for="subject in subjectTwoList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"/>
        </el-select>
      </el-form-item>

      <!-- 课程讲师 -->
      <el-form-item label="Instructor">
        <el-select v-model="courseInfo.teacherId" placeholder="Please Choose...">
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"/>
        </el-select>
      </el-form-item>

      <!-- 总课时 -->
      <el-form-item label="Lectures">
        <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数"/>
      </el-form-item>

      <!-- 课程价格 -->
      <el-form-item label="Price">
        <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元"/>
      </el-form-item>

      <!-- 课程简介 -->
      <el-form-item label="Introduction">
        <!-- 富文本编辑器Tinymce -->
        <tinymce :height="300" v-model="courseInfo.description"/>
      </el-form-item>

      <!-- 课程封面-->
      <el-form-item label="Cover">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API + '/eduoss/fileoss/cover'"
          class="avatar-uploader">
          <img :src="courseInfo.cover">
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">Next</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import course from '@/api/edu/course'
import subject from '@/api/edu/subject'
import Tinymce from '@/components/Tinymce' //引入组件 (富文本编辑器Tinymce)

export default {
    components: { Tinymce }, //声明组件 (富文本编辑器Tinymce)
    data() {
        return {
            saveBtnDisabled: false,
            courseInfo: {
                title: '',
                subjectParentId:'',   //一级分类id
                subjectId: '',        //二级分类id
                teacherId: '',
                lessonNum: 0,
                price: 0,
                description: '',
                cover: '/static/course-cover-default.jpg'
            },
            BASE_API: process.env.BASE_API,   //获取config/dev.env.js里面的请求根路径
            teacherList: [],                  //所有讲师
            subjectOneList: [],               //一级分类
            subjectTwoList: []                //二级分类
        }
    },
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
            if (this.$route.params && this.$route.params.id) {
                // 获取课程id
                this.courseId = this.$route.params.id
                // 根据课程id查询课程基本信息
                this.getInfo()
            } else { //路由中没有id参数 => 添加操作
                // 查询所有讲师
                this.getListTeacher()
                // 查询所有一级分类 and 每个一级分类下对应的二级分类
                this.getOneSubject()
                // 初始化表单
                this.courseInfo = {
                    title: '',
                    subjectParentId:'',   //一级分类id
                    subjectId: '',        //二级分类id
                    teacherId: '',
                    lessonNum: 0,
                    price: 0,
                    description: '',
                    cover: '/static/course-cover-default.jpg'
                }
            }
        },
        // 根据课程id查询课程基本信息
        getInfo() {
            course.getCourseInfoId(this.courseId)
                .then(response => {
                    // 获取课程基本信息
                    this.courseInfo = response.data.courseInfoVo
                    // 查询所有讲师
                    this.getListTeacher()
                    // 查询所有一级分类 and 每个一级分类下对应的二级分类
                    subject.getSubjectList()
                        .then(response => {
                            //  获取所有一级分类 and 每个一级分类下对应的二级分类
                            this.subjectOneList = response.data.list
                            //  遍历所有一级分类
                            for(var i = 0; i < this.subjectOneList.length; i++) {
                                //  当前一级分类
                                var oneSubject = this.subjectOneList[i]
                                //  判断：当前一级分类id 和 courseInfo中的一级分类id 是否一样
                                if(this.courseInfo.subjectParentId === oneSubject.id) {
                                    //  从当前一级分类中获取它对应的所有二级分类
                                    this.subjectTwoList = oneSubject.children
                                }
                            }
                        })
                })
        },
        // 封面上传成功之后触发的方法
        handleAvatarSuccess(res, file) {
            this.courseInfo.cover = res.data.url
        },
        // 封面上传之前触发的方法
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg'
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!')
            }
            return isJPG && isLt2M
        },
        //  点击某个一级分类，触发change事件，显示对应的二级分类
        subjectLevelOneChanged(value) {
            //  value就是点击的一级分类id值
            //  遍历所有一级分类
            for(var i = 0; i < this.subjectOneList.length; i++) {
                //  当前一级分类
                var oneSubject = this.subjectOneList[i]
                //  判断：当前一级分类id 和 点击的一级分类id 是否一样
                if(value === oneSubject.id) {
                    //  从当前一级分类中获取它对应的所有二级分类
                    this.subjectTwoList = oneSubject.children
                    //  清空之前设置的二级分类id值
                    this.courseInfo.subjectId = ''
                }
            }
        },
        // 查询所有一级分类 and 每个一级分类下对应的二级分类
        getOneSubject() {
            subject.getSubjectList()
                .then(response => {
                    this.subjectOneList = response.data.list
                })
        },
        // 查询所有讲师
        getListTeacher() {
            course.getListTeacher()
                .then(response => {
                    this.teacherList = response.data.items
                })
        },
        // 添加课程
        addCourse() {
            course.addCourseInfo(this.courseInfo)
                .then(response => {
                    this.$message({
                        type: 'success',
                        message: 'Add Successfully!'
                    });
                    // 跳转到第二步
                    this.$router.push({path:'/course/chapter/' + response.data.courseId})
                })
        },
        // 修改课程
        updateCourse() {
            course.updateCourseInfo(this.courseInfo)
                .then(response => {
                    this.$message({
                        type: 'success',
                        message: 'Update Successfully!'
                    });
                    // 跳转到第二步
                    this.$router.push({path:'/course/chapter/' + this.courseId})
                })
        },
        saveOrUpdate() {
            if (!this.courseInfo.id) {
                this.addCourse()
            } else {
                this.updateCourse()
            }
        }
    }
}
</script>

<style scoped>
.tinymce-container {
  line-height: 29px;
}
</style>