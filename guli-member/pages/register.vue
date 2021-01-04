<template>
  <div class="main">
    <div class="title">
      <a href="/login">Sign in</a>
      <span>·</span>
      <a class="active" href="/register">Sign up</a>
    </div>

    <div class="sign-up-container">
      <el-form ref="userForm" :model="params">

        <el-form-item class="input-prepend restyle" prop="nickname" :rules="[{ required: true, message: 'Please input your nickname', trigger: 'blur' }]">
          <div>
            <el-input type="text" placeholder="Nickname" v-model="params.nickname"/>
            <i class="iconfont icon-user"/>
          </div>
        </el-form-item>
        
        <el-form-item class="input-prepend restyle no-radius" prop="mobile" :rules="[{ required: true, message: 'Please input your phone number', trigger: 'blur' },{validator: checkPhone, trigger: 'blur'}]">
          <div>
            <el-input type="text" placeholder="Phone Number" v-model="params.mobile"/>
            <i class="iconfont icon-phone"/>
          </div>
        </el-form-item>
        
        <el-form-item class="input-prepend restyle no-radius" prop="code" :rules="[{ required: true, message: 'Please input your PIN code', trigger: 'blur' }]">
          <div style="width: 100%;display: block;float: left;position: relative">
            <el-input type="text" placeholder="PIN code" v-model="params.code"/>
            <i class="iconfont icon-phone"/>
          </div>
          <div class="btn" style="position:absolute;right: 0;top: 6px;width: 40%;">
            <a href="javascript:" type="button" @click="getCodeFun()" :value="codeTest" style="border: none;background-color: none">{{codeTest}}</a>
          </div>
        </el-form-item>
        
        <el-form-item class="input-prepend" prop="password" :rules="[{ required: true, message: 'Please input your password', trigger: 'blur' }]">
          <div>
            <el-input type="password" placeholder="Password" v-model="params.password"/>
            <i class="iconfont icon-password"/>
          </div>
        </el-form-item>
        
        <div class="btn">
          <input type="button" class="sign-up-button" value="Register" @click="submitRegister()"/>
        </div>
        <p class="sign-up-msg">
          Click "Register" to agree and conform to
          <br>
          <a target="_blank" href="http://www.jianshu.com/p/c44d171298ce">Agreement</a>
          and
          <a target="_blank" href="http://www.jianshu.com/p/2ov8x3">Privacy</a> 。
        </p>
      </el-form>
      <!-- 更多注册方式 -->
      <div class="more-sign">
        <h6>Social Register</h6>
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
import registerApi from '@/api/register'

export default {
    layout: 'sign',
    data() {
        return {
            params: {
                mobile: '',
                code: '',
                nickname: '',
                password: ''
            },
            sending: true,   //能否发送验证码
            second: 60,      //倒计时
            codeTest: 'get PIN code'   //验证码表单项右侧的提示信息
        }
    },
    methods: {
        // 发送验证码
        getCodeFun() {
            registerApi.sendCode(this.params.mobile)
                .then(response => {
                    this.sending = false
                    this.timeDown()
                })
        },
        // 用户注册
        submitRegister() {
            registerApi.registerMember(this.params)
                .then(response => {
                    if (response.data.code === 20001) {
                        // 注册失败
                        this.$message({
                            type: 'warning',
                            message: response.data.message
                        })
                    } else {
                        // 注册成功
                        this.$message({
                            type: 'success',
                            message: "注册成功"
                        })
                        // 跳转到登录页面
                        this.$router.push({path: '/login'})
                    }
                })
        },
        timeDown() {
            let timer = setInterval(() => {
                this.second--;
                this.codeTest = this.second;
                if (this.second < 1) {
                    clearInterval(timer);
                    this.sending = true;
                    this.second = 60;
                    this.codeTest = "获取验证码";
                }
            }, 1000);
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