<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- 讲师介绍 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">Introduction</span>
        </h2>
      </header>
      <div class="t-infor-wrap">
        <!-- 讲师基本信息 -->
        <section class="fl t-infor-box c-desc-content">
          <div class="mt20 ml20">
            <section class="t-infor-pic">
              <img :src="teacher.avatar">
            </section>
            <h3 class="hLh30">
              <span class="fsize24 c-333">
                {{teacher.name}}&nbsp;-&nbsp;{{ teacher.level === 1 ? 'Junior' : 'Senior' }}
              </span>
            </h3>
            <section class="mt10">
              <span class="t-tag-bg">{{teacher.career}}</span>
            </section>
            <section class="t-infor-txt">
              <p class="mt20">{{teacher.intro}}</p>
            </section>
            <div class="clear"></div>
          </div>
        </section>
        <div class="clear"></div>
      </div>
      <section class="mt30">
        <div>
          <header class="comm-title all-teacher-title c-course-content">
            <h2 class="fl tac">
              <span class="c-333">His/Her Courses</span>
            </h2>
            <section class="c-tab-title">
              <a href="javascript: void(0)">&nbsp;</a>
            </section>
          </header>
          <!-- /无数据提示 开始-->
          <section v-if="courseList.length==0" class="no-data-wrap">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">no data，courses will come soon...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article v-if="courseList.length>0" class="comm-course-list">
            <ul class="of">
              <li v-for="course in courseList" :key="course.id">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img :src="course.cover" class="img-responsive" >
                    <div class="cc-mask">
                      <a :href="'/course/'+course.id" title="Join Now" class="comm-btn c-btn-1">Join Now</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a :href="'/course/'+course.id" :title="course.title" class="course-title fsize18 c-333">{{course.title}}</a>
                  </h3>
                </div>
              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
      </section>
    </section>
    <!-- /讲师介绍 结束 -->
  </div>
</template>

<script>
import teacherApi from '@/api/teacher'

export default {
    // asyncData is called every time before loading the page component.
    // It will be called server-side once (on the first request to the Nuxt app) and client-side when navigating to further routes.
    // 
    // 异步调用，只会调用一次
    //   params <=> this.$route.params
    //   params.id <=> this.$route.params.id
    asyncData({ params, error }) { 
        // 根据讲师id查询讲师详情
        return teacherApi.getTeacherInfo(params.id)
            .then(response => {
                // 等价于 
                //   this.teacher = response.data.data.teacher
                //   this.courseList = response.data.data.courseList
                return { 
                    teacher: response.data.data.teacher,
                    courseList: response.data.data.courseList
                }
            })
    },
}
</script>