<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="Action">
        <el-tag type="info">excel template instruction</el-tag>
        <el-tag>
          <i class="el-icon-download"/>
          <a :href="'/static/template.xlsx'">Download Template</a>
        </el-tag>
      </el-form-item>

      <el-form-item label="Choose Excel">
        <el-upload
          ref="upload"
          :auto-upload="false"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError"
          :disabled="importBtnDisabled"
          :limit="1"
          :action="BASE_API + '/eduservice/subject/addSubject'"
          name="file"
          accept="application/vnd.ms-excel">
          <el-button slot="trigger" size="small" type="primary">Choose File...</el-button>
          <el-button
            :loading="loading"
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload">Upload to...</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
    data() {
        return {
            BASE_API: process.env.BASE_API, //获取config/dev.env.js里面的请求根路径
            importBtnDisabled: false,       //是否禁用"选取文件"按钮
            loading: false                  //"上传到服务器"按钮是否有loading的动画效果
        }
    },
    created() {

    },
    methods: {
        // 上传到服务器
        submitUpload() {
            this.importBtnDisabled = true
            this.loading = true
            // JavaScript: document.getElementById("upload").submit()
            this.$refs.upload.submit()
        },
        // 上传成功的回调
        fileUploadSuccess(response) {
            this.loading = false
            this.$message({
                type: 'success',
                message: 'Add Categories Successfully'
            })
            // 路由跳转：跳转到课程分类列表
            this.$router.push({path:'/subject/list'})
        },
        // 上传失败的回调
        fileUploadError() {
            this.loading = false
            this.$message({
                type: 'error',
                message: 'Fail to add Categories'
            })
        }
    }
}
</script>