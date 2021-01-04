<template>
  <div class="cart py-container">
    <div class="checkout py-container  pay">
      <div class="checkout-tit">
        <h4 class="fl tit-txt">
          <span class="success-icon"></span>
          <span class="success-info">The order is submitted successfully, please pay in time! Order No. {{payObj.out_trade_no}}</span>
        </h4>
        <span class="fr">
          <em class="sui-lead">Pay Amount: </em>
          <em class="orange money">￥{{payObj.total_fee}}</em></span>
        <div class="clearfix"></div>
      </div>
      <div class="checkout-steps">
        <div class="fl weixin">WeChat Pay</div>
        <div class="fl sao">
          <p class="red">Scan the QR code</p>
          <div class="fl code">
            <!-- 二维码 -->  
            <qriously :value="payObj.code_url" :size="338"/>
            <div class="saosao">
              <p>请使用微信扫一扫</p>
              <p>扫描二维码支付</p>
            </div>
          </div>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
</template>

<script>
import ordersApi from '@/api/orders'

export default {
    // asyncData is called every time before loading the page component.
    // It will be called server-side once (on the first request to the Nuxt app) and client-side when navigating to further routes.
    // 
    // 异步调用，只会调用一次
    //   params <=> this.$route.params
    //   params.oid <=> this.$route.params.oid
    asyncData({ params, error }) {
        // 生成微信支付二维码
        return ordersApi.generateQRCode(params.pid)
            // 等价于 this.payObj = response.data.data
            .then(response => {
                return {
                    payObj: response.data.data
                }
            })
    },
    data() {
        return {
            // 定时器
            timer: ''
        }
    },
    // 在页面渲染之后执行
    mounted() {
        // 每隔三秒查询一次订单状态
        this.timer = setInterval(() => {
            this.queryOrderStatus(this.payObj.out_trade_no)
        }, 3000);
    },
    methods:{
        // 根据订单号查询订单状态
        queryOrderStatus(orderNo) {
            ordersApi.queryPayStatus(orderNo)
                .then(response => {
                    // 支付成功
                    if (response.data.success) {
                        // 清除定时器
                        clearInterval(this.timer)
                        // 提示消息
                        this.$message({
                            type: 'success',
                            message: 'Successful Payment!'
                        })
                        // 跳转到课程详情页面
                        this.$router.push({path: '/course/' + this.payObj.course_id})
                    }
                })
        }
    }
}
</script>