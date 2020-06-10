<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="最终发布"/>
    </el-steps>

    <el-button type="text" @click="openChapterDialog()">添加章节</el-button>

    <!-- 课程章节 -->
    <ul class="chanpterList">
      <li v-for="chapter in chapterVideoList" :key="chapter.id">
        <p>
          {{ chapter.title }}

          <span class="acts">
            <el-button type="text" @click="openVideo(chapter.id)">添加小节</el-button>
            <el-button type="text" @click="openEditChatper(chapter.id)">编辑</el-button>
            <el-button type="text" @click="removeChapter(chapter.id)">删除</el-button>
          </span>
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

    <div>
      <el-button @click="previous">上一步</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
    </div>

    <!-- 章节对话框 -->
    <el-dialog :visible.sync="dialogChapterFormVisible" title="添加/修改 章节">
      <el-form :model="chapter" label-width="120px">
        <el-form-item label="章节标题">
          <el-input v-model="chapter.title"/>
        </el-form-item>
        <el-form-item label="章节排序">
          <el-input-number :min="0" v-model="chapter.sort" controls-position="right"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>

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
            chapter: {   //章节对象
                title: '',
                sort: 0
            },
            dialogChapterFormVisible: false,   //章节对话框
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


        // 删除章节
        removeChapter(chapterId) {
            this.$confirm('此操作将永久删除章节记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => { //点击确定，执行then方法
                // 调用删除的方法
                chapter.deleteChapter(chapterId)
                    .then(response => { //删除成功
                    // 提示信息
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    // 刷新页面
                    this.getChapterVideo()
                })
            }).catch(() => { //点击取消，执行catch方法
                // do nothing
            })
        },
        // 点击"编辑"按钮，弹出章节对话框，此时是修改章节
        openEditChatper(chapterId) {
            // 弹出章节对话框
            this.dialogChapterFormVisible = true
            // 根据id查询章节
            chapter.getChapter(chapterId)   
                .then(response => {
                    // 回显表单数据
                    this.chapter = response.data.chapter
                })
        },
        // 点击"添加章节"按钮，弹出章节对话框，此时是添加章节
        openChapterDialog() {
            // 弹出章节对话框
            this.dialogChapterFormVisible = true
            // 初始化表单数据
            this.chapter.id = ''
            this.chapter.title = ''
            this.chapter.sort = 0
        },
        // 修改章节
        updateChapter() {
            chapter.updateChapter(this.chapter)
                .then(response =>  {
                    //  关闭对话框
                    this.dialogChapterFormVisible = false
                    //  提示信息
                    this.$message({
                        type: 'success',
                        message: '修改章节成功!'
                    });
                    //  刷新页面
                    this.getChapterVideo()
                })
        },
        // 添加章节
        addChapter() {
            //  把课程id设置到chapter对象中
            this.chapter.courseId = this.courseId
            chapter.addChapter(this.chapter)
                .then(response => {
                    //  关闭对话框
                    this.dialogChapterFormVisible = false
                    //  提示信息
                    this.$message({
                        type: 'success',
                        message: '添加章节成功!'
                    });
                    //  刷新页面
                    this.getChapterVideo()
                })
        },
        saveOrUpdate() {
            if (!this.chapter.id) {
                this.addChapter()
            } else {
                this.updateChapter()
            }
        },
        // 根据课程id查询课程大纲，包括章节和小节
        getChapterVideo() {
            chapter.getAllChapterVideo(this.courseId)
                .then(response => {
                    this.chapterVideoList = response.data.allChapterVideo
                })
        }
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