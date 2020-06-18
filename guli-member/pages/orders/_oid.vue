<template>
  <div class="Page Confirm">
    <div class="Title">
      <h1 class="fl f18">订单确认</h1>
      <img src="~/assets/img/cart_setp2.png" class="fr">
      <div class="clear"></div>
    </div>
    <form name="flowForm" id="flowForm" method="post" action="">
      <table class="GoodList">
        <tbody>
        <tr>
          <th class="name">商品</th>
          <th class="price">原价</th>
          <th class="priceNew">价格</th>
        </tr>
        </tbody>
        <tbody>
        <tr>
          <td colspan="3" class="teacher">讲师：{{order.teacherName}}</td>
        </tr>
        <tr class="good">
          <td class="name First">
            <a target="_blank" :href="'https://localhost:3000/course/'+order.courseId">
              <img :src="order.courseCover"></a>
            <div class="goodInfo">
              <input type="hidden" class="ids ids_14502" value="14502">
              <a target="_blank" :href="'https://localhost:3000/course/'+ order.courseId">{{order.courseTitle}}</a>
            </div>
          </td>
          <td class="price">
            <p>￥<strong>{{order.totalFee}}</strong></p>
          </td>
          <td class="red priceNew Last">￥<strong>{{order.totalFee}}</strong></td>
        </tr>
        <tr>
          <td class="Billing tr" colspan="3">
            <div class="tr">
              <p>共 <strong class="red">1</strong> 件商品，合计<span
                class="red f20">￥<strong>{{order.totalFee}}</strong></span></p>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="Finish">
        <div class="fr" id="AgreeDiv">
          <label for="Agree"><p class="on"><input type="checkbox" checked="checked">我已阅读并同意<a href="javascript:" target="_blank">《谷粒学院购买协议》</a></p></label>
        </div>
        <div class="clear"></div>
        <div class="Main fl">
          <div class="fl">
            <a :href="'/course/'+order.courseId">返回课程详情页</a>
          </div>
          <div class="fr">
            <p>共 <strong class="red">1</strong> 件商品，合计<span class="red f20">￥<strong
              id="AllPrice">{{order.totalFee}}</strong></span></p>
          </div>
        </div>
        <input name="score" value="0" type="hidden" id="usedScore">
        <button class="fr redb" type="button" id="submitPay" @click="toPay()">去支付</button>
        <div class="clear"></div>
      </div>
    </form>
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
        // 根据订单号查询订单信息
        return ordersApi.getOrdersInfo(params.oid)
            .then(response => {
                // 等价于 this.order = response.data.data.item
                return {
                    order: response.data.data.item
                }
            })
    },
    methods: {
        toPay() {
            // 跳转到支付页面
            this.$router.push({path:'/pay/' + this.order.orderNo})
        }
    }
}
</script>