<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- 讲师列表 开始 -->
    <section class="container">
      <header class="comm-title all-teacher-title">
        <h2 class="fl tac">
          <span class="c-333">All Instructor</span>
        </h2>
        <section class="c-tab-title">
          <a id="subjectAll" title="All" href="#">All</a>
        </section>
      </header>
      <section class="c-sort-box unBr">
        <div>
          <!-- /无数据提示 开始-->
          <section v-if="data.total==0" class="no-data-wrap">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">no data, instructors will come soon...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article v-if="data.total>0" class="i-teacher-list">
            <ul class="of">
              <li v-for="teacher in data.items" :key="teacher.id">
                <section class="i-teach-wrap">
                  <div class="i-teach-pic">
                    <a :href="'/teacher/'+teacher.id" :title="teacher.name" target="_blank">
                      <img :src="teacher.avatar" :alt="teacher.name" style="height: 141.3px; width: 141.3px;"/>
                    </a>
                  </div>
                  <div class="mt10 hLh30 txtOf tac">
                    <a :href="'/teacher/'+teacher.id" :title="teacher.name" class="fsize18 c-666" target="_blank">{{teacher.name}}</a>
                  </div>
                  <div class="hLh30 txtOf tac">
                    <span class="fsize14 c-999">{{teacher.career}}</span>
                  </div>
                  <div class="mt15 i-q-txt">
                    <p class="c-999 f-fA">{{teacher.intro}}</p>
                  </div>
                </section>
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
              title="First"
              @click.prevent="gotoPage(1)">First</a>

            <a
              :class="{undisable: !data.hasPrevious}"
              href="#"
              title="Prev"
              @click.prevent="gotoPage(data.current - 1)">&lt;</a>

            <a
              v-for="page in data.pages"
              :key="page"
              :class="{current: data.current == page, undisable: data.current == page}"
              :title="page"
              href="#"
              @click.prevent="gotoPage(page)">{{ page }}</a>
            
            <a
              :class="{undisable: !data.hasNext}"
              href="#"
              title="Next"
              @click.prevent="gotoPage(data.current + 1)">&gt;</a>
            
            <a
              :class="{undisable: !data.hasNext}"
              href="#"
              title="Last"
              @click.prevent="gotoPage(data.pages)">Last</a>

            <div class="clear"></div>
          </div>
        </div>
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /讲师列表 结束 -->
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
        // 分页查询讲师
        return teacherApi.getTeacherList(1, 8)
            .then(response => {
                // 等价于 this.data = response.data.data
                return { data: response.data.data }
            })
    },
    methods: {
        // 切换页码
        gotoPage(page) {
            if (page < 1) {
                page = 1;
            }
            if (page > this.data.pages) {
                page = this.data.pages;
            }
            // 分页查询讲师
            teacherApi.getTeacherList(page, 8)
                .then(response => {
                    this.data = response.data.data
                })
        }
    }
}
</script>