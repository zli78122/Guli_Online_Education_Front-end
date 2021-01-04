<template>
  <div class="in-wrap">
    <!-- 公共头引入 -->
    <header id="header">
      <section class="container">
        <h1 id="logo">
          <!-- 
          <a href="#" title="谷粒学院">
            <img src="~/assets/img/logo.png" width="100%" alt="谷粒学院">
          </a>
          -->
        </h1>
        <div class="h-r-nsl">
          <ul class="nav">
            <router-link to="/" tag="li" active-class="current" exact>
              <a>Main</a>
            </router-link>
            <router-link to="/course" tag="li" active-class="current">
              <a>Courses</a>
            </router-link>
            <router-link to="/teacher" tag="li" active-class="current">
              <a>Instructors</a>
            </router-link>
            <router-link to="/article" tag="li" active-class="current">
              <a>Articles</a>
            </router-link>
            <router-link to="/qa" tag="li" active-class="current">
              <a>FAQ</a>
            </router-link>
          </ul>
          <!-- / nav -->
          <ul class="h-r-login">
            <li v-if="!loginInfo.id" id="no-login">
              <a href="/login" title="Sign in">
                <em class="icon18 login-icon">&nbsp;</em>
                <span class="vam ml5">Sign in</span>
              </a>
              |
              <a href="/register" title="Sign up">
                <span class="vam ml5">Sign up</span>
              </a>
            </li>
            <!-- <li v-if="loginInfo.id" id="is-login-one" class="mr10">
              <a id="headerMsgCountId" href="#" title="消息">
                <em class="icon18 news-icon">&nbsp;</em>
              </a>
              <q class="red-point" style="display: none">&nbsp;</q>
            </li> -->
            <li v-if="loginInfo.id" id="is-login-two" class="h-r-user">
              <a href="/ucenter" title>
                <img
                  :src="loginInfo.avatar"
                  width="30"
                  height="30"
                  class="vam picImg"
                  alt
                >
                <span id="userName" class="vam disIb">{{ loginInfo.nickname }}</span>
              </a>
              <a href="javascript: void(0);" title="Sign out" @click="logout()" class="ml5">Sign out</a>
            </li>
            <!-- /未登录显示第1 li；登录后显示第2，3 li -->
          </ul>
          <aside class="h-r-search">
            <form action="#" method="post">
              <label class="h-r-s-box">
                <input type="text" placeholder="Input course name" name="queryCourse.courseName" value>
                <button type="submit" class="s-btn">
                  <em class="icon18">&nbsp;</em>
                </button>
              </label>
            </form>
          </aside>
        </div>
        <aside class="mw-nav-btn">
          <div class="mw-nav-icon"></div>
        </aside>
        <div class="clear"></div>
      </section>
    </header>
    <!-- /公共头引入 -->
      
    <nuxt/>

    <!-- 公共底引入 -->
    <footer id="footer">
      <section class="container">
        <div class>
          <h4 class="hLh30">
            <span class="fsize18 f-fM c-999">Links</span>
          </h4>
          <ul class="of flink-list">
            <li>
              <a href="https://github.com/zli78122" title="Github" target="_blank">Github</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/zhengyu-li-83b85119b/" title="LinkedIn" target="_blank">LinkedIn</a>
            </li>
          </ul>
          <div class="clear"></div>
        </div>
        <div class="b-foot">
          <section class="fl col-7">
            <section class="mr20">
              <section class="b-f-link">
                <a href="#" title="About" target="_blank">About</a>|
                <a href="#" title="Contact" target="_blank">Contact</a>|
                <a href="#" title="Help" target="_blank">Help</a>|
                <a href="#" title="Resources" target="_blank">Resources</a>|
                <span>Cell: +1 (213) 477-5173</span>
                <span>Email：zli78122@usc.edu</span>
              </section>
              <section class="b-f-link mt10">
                <span>©2020-2021 Copyright by zli78122</span>
              </section>
            </section>
          </section>
          <aside class="fl col-3 tac mt15">
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wx-icon.png" alt>
              </span>
            </section>
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wb-icon.png" alt>
              </span>
            </section>
          </aside>
          <div class="clear"></div>
        </div>
      </section>
    </footer>
    <!-- /公共底引入 -->
  </div>
</template>
<script>
import '~/assets/css/reset.css'
import '~/assets/css/theme.css'
import '~/assets/css/global.css'
import '~/assets/css/web.css'
import '~/assets/css/base.css'
import '~/assets/css/activity_tab.css'
import '~/assets/css/bottom_rec.css'
import '~/assets/css/nice_select.css'
import '~/assets/css/order.css'
import '~/assets/css/swiper-3.3.1.min.css'
import '~/assets/css/pages-weixinpay.css'
import cookie from 'js-cookie'
import loginApi from '@/api/login'

export default {
    data() {
        return {
            token: '',
            loginInfo: {
                id: '',
                age: '',
                avatar: '',
                mobile: '',
                nickname: '',
                sex: ''
            }
        }
    },
    created() {
        // 获取请求地址中的token参数值
        // http://localhost:3000/?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJndWxpLXVzZXIiLCJpYXQiOjE1OTIyNzk5MDMsImV4cCI6MTU5MjM2NjMwMywiaWQiOiIxMjcyNjk5NzUyMDc2NTUwMTQ2Iiwibmlja25hbWUiOiJaYWNoYXJ5In0.HBbhc_-l901OhTGrBm3rKLWTq-SMJxlZ3mD2F4gVWjo
        this.token = this.$route.query.token
        // 能获取到token参数值 -> 微信登录
        if (this.token) {
            // 微信登录
            this.wxLogin()
        }

        // 获取用户信息
        this.showInfo()
    },
    methods: {
        // 微信登录
        wxLogin() {
            // 把token放到Cookie中去
            cookie.set('guli_token', this.token, {domain: 'localhost'})
            // 清空Cookie中之前的用户信息
            cookie.set('guli_ucenter', '', {domain: 'localhost'})

            // 调用后端接口 (根据token获取用户信息)，为了页面显示用户登录信息
            loginApi.getLoginUserInfo()
                .then(response => {
                    // 获取用户信息
                    this.loginInfo = response.data.data.userInfo
                    // 把用户信息放到Cookie中去
                    cookie.set('guli_ucenter', this.loginInfo, {domain: 'localhost'})
                })
        },
        // 获取用户信息
        showInfo() {
            // 从Cookie中获取用户信息
            var userStr = cookie.get('guli_ucenter')
            // 把字符串转换为json对象
            if (userStr && userStr !== 'undefined') {
                this.loginInfo = JSON.parse(userStr)
            }
        },
        logout() {
            // 清空Cookie值
            cookie.set('guli_token', '', {domain: 'localhost'})
            cookie.set('guli_ucenter', '', {domain: 'localhost'})
            // 回到首页
            window.location.href = "/";
        }
    }
};
</script>