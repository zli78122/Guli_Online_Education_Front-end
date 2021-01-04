<template>
  <div class="app-container">
    <div style="margin-bottom: 15px">Course List</div>

    <!-- 查询表单 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="courseQuery.title" placeholder="Name"/>
      </el-form-item>

      <el-form-item>
        <el-select v-model="courseQuery.status" clearable placeholder="Status">
          <el-option value="Normal" label="Published"/>
          <el-option value="Draft" label="Unpublished"/>
        </el-select>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()">Search</el-button>
      <el-button type="default" @click="resetData()">Clear</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table :data="list" border fit  highlight-current-row>
      <el-table-column label="No." width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="Name"/>

      <el-table-column label="Status" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.status === 'Normal' ? 'Published' : 'Unpublished' }}
        </template>
      </el-table-column>

      <el-table-column prop="lessonNum" label="Lectures" width="80" align="center"/>

      <el-table-column prop="gmtCreate" label="Create Time" width="160"/>

      <el-table-column prop="viewCount" label="Viewer" width="100" align="center"/>

      <el-table-column label="Action" width="420" align="center">
        <template slot-scope="scope">
          <router-link :to="'/course/info/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">Update Basic Info</el-button>
          </router-link>
          <router-link :to="'/course/chapter/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">Update Chapter</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>

<script>
import course from '@/api/edu/course'

export default {
    data() {
        return {
          list: null,        //查询之后接口返回集合
          page: 1,           //当前页
          limit: 10,         //每页记录数
          total: 0,          //总记录数
          courseQuery: {}    //条件封装对象
        }
    },
    created() {
        this.getList()
    },
    methods: {
        // 分页条件查询课程
        getList(page = 1) {
            this.page = page
            course.getCourseListPage(this.page, this.limit, this.courseQuery)
                .then(response => {
                    this.list = response.data.rows
                    this.total = response.data.total
                })
        },
        // 重置表单数据
        resetData() {
            //  表单输入项数据清空
            this.courseQuery = {}
            //  查询所有课程数据
            this.getList()
        },
        // 删除课程
        removeDataById(id) {
            this.$confirm('Confirm delete, continue...', 'Warning', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => { //点击确定，执行then方法
                // 调用删除的方法
                course.deleteCourseById(id)
                    .then(response => { //删除成功
                    // 提示信息
                    this.$message({
                        type: 'success',
                        message: 'Delete Successfully!'
                    });
                    // 回到列表页面
                    this.getList()
                })
            }).catch(() => { //点击取消，执行catch方法
                // do nothing
            })
        }
    }
}
</script>