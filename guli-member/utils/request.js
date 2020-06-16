import axios from 'axios'
import cookie from 'js-cookie'
import { Message, MessageBox } from 'element-ui'

// 创建Axios实例
const service = axios.create({
  baseURL: 'http://localhost:9001',   // api的base_url
  timeout: 20000                      // 请求超时时间
})

// http request 拦截器
service.interceptors.request.use(
  config => {
    // 判断Cookie中是否有Key值为'guli_token'的数据
    if (cookie.get('guli_token')) {
      // 如果有的话，将其存入请求头中
      // Token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJndWxpLXVzZXIiLCJpYXQiOjE1OTIyNTM2NTcsImV4cCI6MTU5MjM0MDA1NywiaWQiOiIxMjcyMzkwNDc4NDE4OTQ4MDk4Iiwibmlja25hbWUiOiJ6aGVuZ3l1In0.vh9kOzYBvMhwtsh4wL9E0BLH85XP8l_C-vvsC20GqBA
      config.headers['Token'] = cookie.get('guli_token');
    }
    return config
  },
  err => {
    return Promise.reject(err);
  }
)

// http response 拦截器
service.interceptors.response.use(

)

export default service