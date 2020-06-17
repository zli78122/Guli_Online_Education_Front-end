<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部课程</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">课程类别</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li>
                  <a title="全部" href="javascript: void(0);" @click="searchAll()">全部</a>
                </li>
                <!-- 
                    :class="{active : oneIndex == index}
                        oneIndex == index   ->   class="active"
                        oneIndex != index   ->   class=""
                 -->
                <li v-for="(item, index) in subjectNestedList" :key="index" :class="{active : oneIndex == index}">
                  <a :title="item.title" href="javascript: void(0);" @click="searchOne(item.id, index)">{{item.title}}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="c-999 fsize14"></span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <!-- 
                    :class="{active : twoIndex == index}
                        twoIndex == index   ->   class="active"
                        twoIndex != index   ->   class=""
                 -->
                <li v-for="(item, index) in subSubjectList" :key="index" :class="{active : twoIndex == index}">
                  <a :title="item.title" href="javascript: void(0);" @click="searchTwo(item.id, index)">{{item.title}}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <div class="clear"></div>
        </section>
        <div class="js-wrap">
          <section class="fr">
            <span class="c-ccc">
              <i class="c-master f-fM">1</i>/
              <i class="c-666 f-fM">1</i>
            </span>
          </section>
          <section class="fl">
            <ol class="js-tap clearfix">
              <li :class="{'current bg-orange' : buyCountSort != ''}">
                <a title="销量" href="javascript: void(0);" @click="searchBuyCount()">销量
                  <span :class="{hide : buyCountSort == ''}">↓</span>
                </a>
              </li>
              <li :class="{'current bg-orange' : gmtCreateSort != ''}">
                <a title="最新" href="javascript: void(0);" @click="searchGmtCreate()">最新
                  <span :class="{hide : gmtCreateSort == ''}">↓</span>
                </a>
              </li>
              <li :class="{'current bg-orange' : priceSort != ''}">
                <a title="价格" href="javascript: void(0);" @click="searchPrice()">价格
                  <span :class="{hide : priceSort == ''}">↓</span>
                </a>
              </li>
            </ol>
          </section>
        </div>
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section v-if="data.total==0" class="no-data-wrap">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article v-if="data.total>0" class="comm-course-list">
            <ul class="of" id="bna">
              <li v-for="item in data.items" :key="item.id">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img :src="item.cover" class="img-responsive" :alt="item.title" style="height: 150px; width: 267.5px;"/>
                    <div class="cc-mask">
                      <a :href="'/course/'+item.id" title="开始学习" class="comm-btn c-btn-1">开始学习</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a :href="'/course/'+item.id" :title="item.title" class="course-title fsize18 c-333">{{item.title}}</a>
                  </h3>
                  <section class="mt10 hLh20 of">
                    <span v-if="Number(item.price) === 0" class="fr jgTag bg-green">
                      <i class="c-fff fsize12 f-fA">免费</i>
                    </span>
                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">9634人学习</i>
                      |
                      <i class="c-999 f-fA">9634评论</i>
                    </span>
                  </section>
                </div>
              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
        <!-- 公共分页 开始 -->
        <div>
          <div class="paging">
            <a
              :class="{undisable: !data.hasPrevious}"
              href="#"
              title="首页"
              @click.prevent="gotoPage(1)">首</a>

            <a
              :class="{undisable: !data.hasPrevious}"
              href="#"
              title="前一页"
              @click.prevent="gotoPage(data.current - 1)">&lt;</a>

            <a
              v-for="page in data.pages"
              :key="page"
              :class="{current: data.current == page, undisable: data.current == page}"
              :title="'第'+page+'页'"
              href="#"
              @click.prevent="gotoPage(page)">{{page}}</a>

            <a
              :class="{undisable: !data.hasNext}"
              href="#"
              title="后一页"
              @click.prevent="gotoPage(data.current + 1)">&gt;</a>

            <a
              :class="{undisable: !data.hasNext}"
              href="#"
              title="末页"
              @click.prevent="gotoPage(data.pages)">末</a>

            <div class="clear"></div>
          </div>
        </div>
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>

<script>
import courseApi from '@/api/course'

export default {
    data() {
        return {
            page: 1,                 //当前页码
            data: {},                //课程数据
            subjectNestedList: [],   //课程一级分类
            subSubjectList: [],      //课程二级分类
            searchObj: {},           //条件查询对象
            oneIndex: -1,            //控制一级分类CSS样式
            twoIndex: -1,            //控制二级分类CSS样式
            buyCountSort: "",        //销量排序，同时控制销量排序CSS样式
            gmtCreateSort: "",       //最新时间排序，同时控制最新时间排序CSS样式
            priceSort: ""            //价格排序，同时控制价格排序CSS样式
        }
    },
    created() {
        // 初始化课程分类数据
        this.initSubjectData()
        // 初始化课程数据
        this.initCourseData()
    },
    methods: {
        searchAll() {
            // 初始化数据
            this.subSubjectList = []
            this.oneIndex = -1
            this.twoIndex = -1
            this.buyCountSort = ""
            this.gmtCreateSort = ""
            this.priceSort = ""

            // 清空条件查询对象
            this.searchObj = {}

            // 分页条件查询课程
            this.gotoPage(1)
        },
        searchPrice() {
            // 初始化数据
            this.buyCountSort = ""
            this.gmtCreateSort = ""

            // 设置 价格排序
            if (this.priceSort === "") {
                this.priceSort = 1;
            } else {
                this.priceSort = "";
            }

            // 封装查询条件
            this.searchObj.buyCountSort = this.buyCountSort
            this.searchObj.gmtCreateSort = this.gmtCreateSort;
            this.searchObj.priceSort = this.priceSort;

            // 分页条件查询课程
            this.gotoPage(1)
        },
        searchGmtCreate() {
            // 初始化数据
            this.buyCountSort = ""
            this.priceSort = ""

            // 设置 最新时间排序
            if (this.gmtCreateSort === "") {
                this.gmtCreateSort = "1"
            } else {
                this.gmtCreateSort = ""
            }

            // 封装查询条件
            this.searchObj.buyCountSort = this.buyCountSort
            this.searchObj.gmtCreateSort = this.gmtCreateSort;
            this.searchObj.priceSort = this.priceSort;

            // 分页条件查询课程
            this.gotoPage(1)
        },
        searchBuyCount() {
            // 初始化数据
            this.gmtCreateSort = ""
            this.priceSort = ""

            // 设置 销量排序
            if (this.buyCountSort === "") {
                this.buyCountSort = "1"
            } else {
                this.buyCountSort = ""
            }

            // 封装查询条件
            this.searchObj.buyCountSort = this.buyCountSort
            this.searchObj.gmtCreateSort = this.gmtCreateSort;
            this.searchObj.priceSort = this.priceSort;

            // 分页条件查询课程
            this.gotoPage(1)
        },
        // 点击某个二级分类，分页条件查询课程
        searchTwo(subjectId,index) {
            // 控制二级分类CSS样式
            this.twoIndex = index

            // 封装查询条件 (课程二级分类)
            this.searchObj.subjectId = subjectId
            // 分页条件查询课程
            this.gotoPage(1)
        },
        // 点击某个一级分类，查询对应的二级分类
        searchOne(subjectParentId, index) {
            // 初始化数据
            this.subSubjectList = []
            this.twoIndex = -1
            this.searchObj.subjectId = ""

            // 控制一级分类CSS样式
            this.oneIndex = index

            // 封装查询条件 (课程一级分类)
            this.searchObj.subjectParentId = subjectParentId
            // 分页条件查询课程
            this.gotoPage(1)

            // 查询 目标一级分类(subjectParentId) 对应的二级分类
            for (let i = 0; i < this.subjectNestedList.length; i++) {
                var oneSubject = this.subjectNestedList[i]
                if (subjectParentId === oneSubject.id) {
                    // 获取课程二级分类
                    this.subSubjectList = oneSubject.children
                }
            }
        },
        // 切换页码
        gotoPage(page) {
            if (page < 1) {
                page = 1;
            }
            if (page > this.data.pages) {
                page = this.data.pages;
            }
            // 分页条件查询课程
            courseApi.getCourseList(page, 8, this.searchObj)
                .then(response => {
                    this.data = response.data.data
                })
        },
        // 初始化课程分类数据
        initSubjectData() {
            // 查询所有课程分类
            courseApi.getAllSubject()
                .then(response => {
                    this.subjectNestedList = response.data.data.list
                })
        },
        // 初始化课程数据
        initCourseData() {
            // 分页条件查询课程
            courseApi.getCourseList(1, 8, this.searchObj)
                .then(response => {
                    this.data = response.data.data
                })
        }
    }
}
</script>

<style scoped>
  .active {
    background: #68cb9b;
  }
  .active a {
    color: #fbfdfd;
  }
  .active a:hover {
    color: #fbfdfd;
  }
  .hide {
    display: none;
  }
  .show {
    display: block;
  }
</style>