<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程详情 开始 -->
    <section class="container">
      <section class="path-wrap txtOf hLh30">
        <a href="#" title class="c-999 fsize14">Main</a>
        \
        <a href="#" title class="c-999 fsize14">{{courseWebVo.subjectLevelOne}}</a>
        \
        <span class="c-333 fsize14">{{courseWebVo.subjectLevelTwo}}</span>
      </section>
      <div>
        <article class="c-v-pic-wrap" style="height: 357px;">
          <section class="p-h-video-box" id="videoPlay">
            <img 
              :src="courseWebVo.cover" 
              :alt="courseWebVo.title" 
              style="height: 357px; width: 640px" 
              class="dis c-v-pic"
            >
          </section>
        </article>
        <aside class="c-attr-wrap">
          <section class="ml20 mr15">
            <h2 class="hLh30 txtOf mt15">
              <span class="c-fff fsize24">{{courseWebVo.title}}</span>
            </h2>
            <section class="c-attr-jg">
              <span class="c-fff">Price: </span>
              <b class="c-yellow" style="font-size:24px;">$ {{courseWebVo.price}}</b>
            </section>
            <section class="c-attr-mt c-attr-undis">
              <span class="c-fff fsize14">Instructor: {{courseWebVo.teacherName}}</span>
            </section>
            <section class="c-attr-mt of">
              <span class="ml10 vam">
                <em class="icon18 scIcon"></em>
                <a class="c-fff vam" title="Like" href="#" >Like</a>
              </span>
            </section>
            <section v-if="isbuy || Number(courseWebVo.price) === 0" class="c-attr-mt">
              <a href="javascript: void(0)" title="Watch Now" class="comm-btn c-btn-3">Watch Now</a>
            </section>
            <section v-else class="c-attr-mt">
              <a href="javascript: void(0)" title="Buy Now" @click="createOrders()" class="comm-btn c-btn-3">Buy Now</a>
            </section>
          </section>
        </aside>
        <aside class="thr-attr-box">
          <ol class="thr-attr-ol">
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">Buy Count</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{courseWebVo.buyCount}}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">Lectures</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{courseWebVo.lessonNum}}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">Viewers</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{courseWebVo.viewCount}}</h6>
              </aside>
            </li>
          </ol>
        </aside>
        <div class="clear"></div>
      </div>
      <!-- /课程封面介绍 -->
      <div class="mt20 c-infor-box">
        <article class="fl col-7">
          <section class="mr30">
            <div class="i-box">
              <div>
                <section id="c-i-tabTitle" class="c-infor-tabTitle c-tab-title">
                  <a name="c-i" class="current" title="Details">Details</a>
                </section>
              </div>
              <article class="ml10 mr10 pt20">
                <div>
                  <h6 class="c-i-content c-infor-title">
                    <span>Introduction</span>
                  </h6>
                  <div class="course-txt-body-wrap">
                    <section class="course-txt-body">
                      <p v-html="courseWebVo.description">{{courseWebVo.description}}</p>
                    </section>
                  </div>
                </div>
                <!-- /课程介绍 -->
                <div class="mt50">
                  <h6 class="c-g-content c-infor-title">
                    <span>Outline</span>
                  </h6>
                  <section class="mt20">
                    <div class="lh-menu-wrap">
                      <menu id="lh-menu" class="lh-menu mt10 mr10">
                        <ul>
                          <!-- 文件目录 -->
                          <li v-for="chapter in chapterVideoList" :key="chapter.id" class="lh-menu-stair">
                            <a href="javascript: void(0)" :title="chapter.title" class="current-1">
                              <em class="lh-menu-i-1 icon18 mr10"></em>{{chapter.title}}
                            </a>
                            <ol class="lh-menu-ol" style="display: block;">
                              <li v-for="video in chapter.children" :key="video.id" class="lh-menu-second ml30">
                                <a :href="'/player/'+video.videoSourceId" target="_blank">
                                  <span class="fr">
                                    <i class="free-icon vam mr10">Free Trial</i>
                                  </span>
                                  <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em>{{video.title}}
                                </a>
                              </li>
                            </ol>
                          </li>
                        </ul>
                      </menu>
                    </div>
                  </section>
                </div>
                <!-- /课程大纲 -->
              </article>
            </div>
          </section>
        </article>
        <aside class="fl col-3">
          <div class="i-box">
            <div>
              <section class="c-infor-tabTitle c-tab-title">
                <a title href="javascript: void(0)">Instructor</a>
              </section>
              <section class="stud-act-list">
                <ul style="height: auto;">
                  <li>
                    <div class="u-face">
                      <a href="javascript: void(0)">
                        <img :src="courseWebVo.avatar" width="50" height="50" alt>
                      </a>
                    </div>
                    <section class="hLh30 txtOf">
                      <a class="c-333 fsize16 fl" href="javascript: void(0)">{{courseWebVo.teacherName}}</a>
                    </section>
                    <section class="hLh20 txtOf">
                      <span class="c-999">{{courseWebVo.intro}}</span>
                    </section>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </aside>
        <div class="clear"></div>
      </div>
    </section>
    <!-- /课程详情 结束 -->
  </div>
</template>

<script>
import courseApi from '@/api/course'
import ordersApi from '@/api/orders'

export default {
    // asyncData is called every time before loading the page component.
    // It will be called server-side once (on the first request to the Nuxt app) and client-side when navigating to further routes.
    // 
    // 异步调用，只会调用一次
    //   params <=> this.$route.params
    //   params.id <=> this.$route.params.id
    asyncData({ params, error }) {
        // 等价于 this.courseId = params.id
        return { courseId: params.id }
    },
    data() {
        return {
            courseWebVo: {},
            chapterVideoList: [],
            isbuy: false
        }
    },
    created() {
        // 初始化课程信息
        this.initCourseInfo()
    },
    methods: {
        // 生成订单
        createOrders() {
            ordersApi.createOrders(this.courseId)
                .then(response => {
                    // 生成订单之后，跳转到订单显示页面
                    this.$router.push({path:'/orders/' + response.data.data.orderId})
                })
        },
        // 初始化课程信息
        initCourseInfo() {
            // 根据课程id查询课程详情
            courseApi.getCourseInfo(this.courseId)
                .then(response => {
                    this.courseWebVo = response.data.data.courseWebVo,
                    this.chapterVideoList = response.data.data.chapterVideoList,
                    this.isbuy = response.data.data.isBuy
                })
        }
    }
}
</script>