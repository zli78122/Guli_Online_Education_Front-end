<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="最终发布"/>
    </el-steps>

    <!-- 课程章节 -->
    <ul class="chanpterList">
        <li v-for="chapter in chapterVideoList" :key="chapter.id">
            <p>
                {{ chapter.title }}

            </p>

            <!-- 课程小节 -->
            <ul class="chanpterList videoList">
                <li v-for="video in chapter.children" :key="video.id">
                    <p>
                        {{ video.title }}
                    </p>
                </li>
            </ul>
        </li>
    </ul>

    <el-form label-width="120px">
      <el-form-item>
        <el-button @click="previous">上一步</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import chapter from '@/api/edu/chapter'
// import video from '@/api/edu/video'

export default {
    data() {
        return {
            saveBtnDisabled: false,
            courseId: '',
            chapterVideoList: [],   //课程大纲，包括章节和小节
        }
    },
    created() {
        // 获取路由参数对象：this.$route.params
        // 获取路由参数对象中的id参数值：this.$route.params.id
        if(this.$route.params && this.$route.params.id) {
            // 获取课程id
            this.courseId = this.$route.params.id
            // 根据课程id查询课程大纲，包括章节和小节
            this.getChapterVideo()
        }
    },
    methods: {
        previous() {
            this.$router.push({path:'/course/info/' + this.courseId})
        },
        next() {
            this.$router.push({path:'/course/publish/' + this.courseId})
        },



        // 根据课程id查询课程大纲，包括章节和小节
        getChapterVideo() {
            chapter.getAllChapterVideo(this.courseId)
                .then(response => {
                    this.chapterVideoList = response.data.allChapterVideo
                })
        },
    }
}
</script>

<style scoped>
.chanpterList{
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}
.chanpterList li{
  position: relative;
}
.chanpterList p{
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #DDD;
}
.chanpterList .acts {
  float: right;
  font-size: 14px;
}

.videoList{
  padding-left: 50px;
}
.videoList p{
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #DDD;
}
</style>