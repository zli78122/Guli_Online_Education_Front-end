<template>
  <div class="app-container">
    <!-- 表单 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-select v-model="searchObj.type" clearable placeholder="Please Choose...">
          <el-option label="Login Number" value="login_num"/>
          <el-option label="Register Number" value="register_num"/>
          <el-option label="Video View Number" value="video_view_num"/>
          <el-option label="Active Course Number" value="course_num"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchObj.begin"
          type="date"
          placeholder="Start Date"
          value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchObj.end"
          type="date"
          placeholder="End Date"
          value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-button
        :disabled="btnDisabled"
        type="primary"
        icon="el-icon-search"
        @click="showChart()">Search</el-button>
    </el-form>

    <div class="chart-container">
      <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
      <div id="chart" class="chart" style="height: 500px; width: 100%" />
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import staApi from '@/api/sta'

export default {
    data() {
        return {
            searchObj: {},
            btnDisabled: false,
            xData: [],
            yData: []
        }
    },
    methods: {
        // 获取统计数据
        showChart() {
            staApi.getDataSta(this.searchObj)
                .then(response => {
                    this.yData = response.data.numDataList
                    this.xData = response.data.date_calculatedList
                    
                    // 生成图表
                    this.generateChart()
                })
        },
        // 生成图表
        generateChart() {
            // 基于准备好的 DOM，初始化 ECharts 实例
            this.chart = echarts.init(document.getElementById('chart'))

            // 指定图表的配置项和数据
            var option = {
                // 标题
                title: {
                    text: 'Stats Result'
                },
                // x坐标轴触发提示
                tooltip: {
                    trigger: 'axis'
                },
                // 区域缩放
                dataZoom: [{
                    show: true,
                    height: 30,
                    xAxisIndex: [0],
                    bottom: 30,
                    start: 10,
                    end: 80,
                    handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                    handleSize: '110%',
                    handleStyle: {
                        color: '#d3dee5'
                    },
                    textStyle: {
                        color: '#fff'
                    },
                    borderColor: '#90979c'
                },
                {
                    type: 'inside',
                    show: true,
                    height: 15,
                    start: 1,
                    end: 35
                }],
                // x轴是类目轴 (离散数据)
                xAxis: {
                    type: 'category',
                    data: this.xData
                },
                // y轴是数据轴 (连续数据)
                yAxis: {
                    type: 'value'
                },
                // 系列列表 (每个系列通过 type 决定自己的图表类型)
                series: [{
                    // 数据
                    data: this.yData,
                    // 折线图
                    type: 'line'
                }]
            }

            // 使用刚指定的配置项和数据显示图表
            this.chart.setOption(option)
        }
    }
}
</script>