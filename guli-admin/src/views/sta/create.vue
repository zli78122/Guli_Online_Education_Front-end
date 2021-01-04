<template>
  <div class="app-container">
    <!-- 表单 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="Date">
        <el-date-picker 
          v-model="day" 
          type="date" 
          placeholder="Please Choose Date" 
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-button :disabled="btnDisabled" type="primary" @click="create()">Generate</el-button>
    </el-form>
  </div>
</template>

<script>
import sta from '@/api/sta'

export default {
    data() {
        return {
            day: '',
            btnDisabled: false
        }
    },
    created() {

    },
    methods:{
        create() {
            // 统计某一天的注册人数，生成统计数据
            sta.createStaData(this.day)
                .then(response => {
                    this.$message({
                        type: 'success',
                        message: 'Generate Successfully!'
                    })
                    // 跳转到图表显示页面
                    this.$router.push({path: '/sta/show'})
                })
        }
    }
}
</script>