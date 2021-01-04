<template>
  <div class="main">
    <div class="title">
      <a class="active" href="/login">Sign in</a>
      <span>·</span>
      <a href="/register">Sign up</a>
    </div>

    <div class="sign-up-container">
      <el-form ref="userForm" :model="user">

        <el-form-item class="input-prepend restyle" prop="mobile" :rules="[{ required: true, message: 'Please input your phone number', trigger: 'blur' },{validator: checkPhone, trigger: 'blur'}]">
          <div >
            <el-input type="text" placeholder="Phone Number" v-model="user.mobile"/>
            <i class="iconfont icon-phone" />
          </div>
        </el-form-item>

        <el-form-item class="input-prepend" prop="password" :rules="[{ required: true, message: 'Please input your password', trigger: 'blur' }]">
          <div>
            <el-input type="password" placeholder="Password" v-model="user.password"/>
            <i class="iconfont icon-password"/>
          </div>
        </el-form-item>

        <div class="btn">
          <input type="button" class="sign-in-button" value="Login" @click="submitLogin()"/>
        </div>
      </el-form>
      <!-- 更多登录方式 -->
      <div class="more-sign">
        <h6>Social Login</h6>
        <ul>
          <li><a id="weixin" class="weixin" href="http://localhost:8150/api/ucenter/wx/login"><i class="iconfont icon-weixin"/></a></li>
          <li><a id="qq" class="qq" href="javascript: void(0);"><i class="iconfont icon-qq"/></a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import '~/assets/css/sign.css'
import '~/assets/css/iconfont.css'
import cookie from 'js-cookie'
import loginApi from '@/api/login'

export default {
    layout: 'sign',
    data () {
        return {
            // 登录信息
            user: {
                mobile: '',
                password: ''
            },
            // 登录成功之后的用户信息
            loginInfo: {}
        }
    },
    methods: {
        // 用户登录
        submitLogin() {
            // 第一步：调用后端接口进行登录，返回token字符串
            loginApi.submitLoginUser(this.user)
                .then(response => {
                    if (response.data.code === 20000) {
                        // 登录成功
                        this.$message({
                            type: 'success',
                            message: "登录成功"
                        })

                        // 第二步：获取token字符串，并把它放到Cookie中去
                        //   第一个参数 : Key
                        //   第二个参数 : Value
                        //   第三个参数 : 作用范围
                        cookie.set('guli_token', response.data.data.token, {domain: 'localhost'})

                        // 第三步：创建请求拦截器 (utils/request.js)

                        // 第四步：调用后端接口 (根据token获取用户信息)，为了页面显示用户登录信息
                        loginApi.getLoginUserInfo()
                            .then(response => {
                                // 获取用户信息
                                this.loginInfo = response.data.data.userInfo
                                // 把用户信息放到Cookie中去
                                cookie.set('guli_ucenter', this.loginInfo, {domain: 'localhost'})
                                // 跳转页面
                                window.location.href = "/";
                            })
                    } else {
                        // 登录失败
                        this.$message({
                            type: 'warning',
                            message: response.data.message
                        })
                    }
                })
        },
        checkPhone (rule, value, callback) {
            if (!(/^1[34578]\d{9}$/.test(value))) {
                return callback(new Error('手机号码格式不正确'))
            }
            return callback()
        }
    }
}
</script>

<style>
.el-form-item__error {
    z-index: 9999999;
}
</style>