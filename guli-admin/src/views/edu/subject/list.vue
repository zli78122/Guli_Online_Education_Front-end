<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />
    
    <el-tree
      ref="tree2"
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />
  </div>
</template>

<script>
import subject from '@/api/edu/subject'

export default {
    data() {
        return {
            filterText: '',
            data2: [], //所有课程分类数据，以树形结构进行显示
            defaultProps: {
                children: 'children',
                label: 'title'
            }
        }
    },
    created() {
        this.getAllSubjectList()
    },
    watch: {
        filterText(val) {
            this.$refs.tree2.filter(val)
        }
    },
    methods: {
        // 查询所有课程分类
        getAllSubjectList() {
            subject.getSubjectList()
                .then(response => {
                    this.data2 = response.data.list
                })
        },
        // 优化过滤功能：搜索不区分大小写
        filterNode(value, data) {
            if (!value) {
                return true
            }
            return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
        }
    }
}
</script>