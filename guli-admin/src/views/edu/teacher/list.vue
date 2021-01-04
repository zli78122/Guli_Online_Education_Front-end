<template>
  <div class="app-container">
    <div style="margin-bottom: 15px">Instructor List</div>

    <!-- 查询表单 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="teacherQuery.name" placeholder="Name"/>
      </el-form-item>

      <el-form-item>
        <el-select v-model="teacherQuery.level" clearable placeholder="Title">
          <el-option :value="1" label="Junior Instructor"/>
          <el-option :value="2" label="Senior Instructor"/>
        </el-select>
      </el-form-item>

      <el-form-item label="Time">
        <el-date-picker
          v-model="teacherQuery.begin"
          type="datetime"
          placeholder="Start Time"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="teacherQuery.end"
          type="datetime"
          placeholder="End Time"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()">Search</el-button>
      <el-button type="default" @click="resetData()">Clear</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table
      :data="list"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="No."
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="name" label="Name" width="130" />

      <el-table-column label="Title" width="80">
        <template slot-scope="scope">
          {{ scope.row.level === 1 ? 'Junior' : 'Senior' }}
        </template>
      </el-table-column>

      <el-table-column prop="intro" label="Introduction" />

      <el-table-column prop="gmtCreate" label="Create Time" width="160"/>

      <el-table-column prop="sort" label="Sort" width="60" />

      <el-table-column label="Action" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">Update</el-button>
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
import teacher from '@/api/edu/teacher'

export default {
    //  定义变量和初始值
    data() {
        return {
          list: null,        //查询之后接口返回集合
          page: 1,           //当前页
          limit: 5,          //每页记录数
          total: 0,          //总记录数
          teacherQuery: {}   //条件封装对象
        }
    },
    //  页面渲染之前执行，一般调用methods定义的方法
    created() {
        this.getList()
    },
    //  创建具体的方法，调用teacher.js定义的方法
    methods: {
        getList(page = 1) {
            this.page = page
            teacher.getTeacherListPage(this.page, this.limit, this.teacherQuery) //发送Axios请求
                .then(response => {
                    this.list = response.data.rows
                    this.total = response.data.total
                    console.log(this.list)
                    console.log(this.total)
                })
        },
        // 重置表单数据
        resetData() {
            //  表单输入项数据清空
            this.teacherQuery = {}
            //  查询所有讲师数据
            this.getList()
        },
        // 删除讲师
        removeDataById(id) {
            this.$confirm('Confirm delete action, continue!', 'Warning', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => { //点击确定，执行then方法
                // 调用删除的方法
                teacher.deleteTeacherById(id)
                    .then(response => { //删除成功
                    // 提示信息
                    this.$message({
                        type: 'success',
                        message: 'Successful Delete!'
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