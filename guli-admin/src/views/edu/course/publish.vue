<template>
  <div class="app-container">
    <h2 style="text-align: center;">Publish New Course</h2>

    <el-steps :active="3" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="Basic Information"/>
      <el-step title="Chapter Information"/>
      <el-step title="Publish"/>
    </el-steps>

    <div class="ccInfo">
      <img :src="coursePublish.cover">
      <div class="main">
        <h2>{{ coursePublish.title }}</h2>
        <p class="gray"><span>{{ coursePublish.lessonNum }} Lectures</span></p>
        <p><span>Category: {{ coursePublish.subjectLevelOne }} — {{ coursePublish.subjectLevelTwo }}</span></p>
        <p>Instructor: {{ coursePublish.teacherName }}</p>
        <h3 class="red">￥{{ coursePublish.price }}</h3>
      </div>
    </div>

    <div>
      <el-button @click="previous">Prev</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="publish">Publish</el-button>
    </div>
  </div>
</template>

<script>
import course from '@/api/edu/course'

export default {
    data() {
        return {
            saveBtnDisabled: false,
            courseId: '',
            coursePublish: {}
        }
    },
    created() {
        // 获取路由参数对象：this.$route.params
        // 获取路由参数对象中的id参数值：this.$route.params.id
        if (this.$route.params && this.$route.params.id) {
            // 获取课程id
            this.courseId = this.$route.params.id
            // 根据课程id查询课程确认信息
            this.getCoursePublishId()
        }
    },
    methods: {
        // 上一步
        previous() {
            this.$router.push({path:'/course/chapter/' + this.courseId})
        },
        // 课程最终发布
        publish() {
            course.publihCourse(this.courseId)
                .then(response => {
                    this.$message({
                        type: 'success',
                        message: 'Publish Successfully!'
                    });
                    // 跳转到课程列表页面
                    this.$router.push({ path: '/course/list' })
                })
        },
        // 根据课程id查询课程确认信息
        getCoursePublishId() {
            course.getPublihCourseInfo(this.courseId)
                .then(response => {
                    this.coursePublish = response.data.publishCourse
                })
        }
    }
}
</script>

<style scoped>
.ccInfo {
    background: #f5f5f5;
    padding: 20px;
    overflow: hidden;
    border: 1px dashed #DDD;
    margin-bottom: 40px;
    position: relative;
}
.ccInfo img {
    background: #d6d6d6;
    width: 500px;
    height: 278px;
    display: block;
    float: left;
    border: none;
}
.ccInfo .main {
    margin-left: 520px;
}

.ccInfo .main h2 {
    font-size: 28px;
    margin-bottom: 30px;
    line-height: 1;
    font-weight: normal;
}
.ccInfo .main p {
    margin-bottom: 10px;
    word-wrap: break-word;
    line-height: 24px;
    max-height: 48px;
    overflow: hidden;
}
.ccInfo .main p {
    margin-bottom: 10px;
    word-wrap: break-word;
    line-height: 24px;
    max-height: 48px;
    overflow: hidden;
}
.ccInfo .main h3 {
    left: 540px;
    bottom: 20px;
    line-height: 1;
    font-size: 28px;
    color: #d32f24;
    font-weight: normal;
    position: absolute;
}
</style>