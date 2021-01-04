<template>
  <div class="Page Confirm">
    <div class="Title">
      <h1 class="fl f18">Order Confirmation</h1>
      <img src="~/assets/img/cart_setp2.png" class="fr">
      <div class="clear"></div>
    </div>
    <form name="flowForm" id="flowForm" method="post" action="">
      <table class="GoodList">
        <tbody>
        <tr>
          <th class="name">Course</th>
          <th class="price">Price</th>
          <th class="priceNew">Pay</th>
        </tr>
        </tbody>
        <tbody>
        <tr>
          <td colspan="3" class="teacher">Instructor: {{order.teacherName}}</td>
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
              <p>Count: <strong class="red">1</strong>, Total Price: <span
                class="red f20">$ <strong>{{order.totalFee}}</strong></span></p>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="Finish">
        <div class="fr" id="AgreeDiv">
          <label for="Agree"><p class="on"><input type="checkbox" checked="checked">Read and agree<a href="javascript:" target="_blank">《Course Purchase Agreement》</a></p></label>
        </div>
        <div class="clear"></div>
        <div class="Main fl">
          <div class="fl">
            <a :href="'/course/'+order.courseId">Back to the course page</a>
          </div>
          <div class="fr">
            <p>Count: <strong class="red">1</strong>, Total Price<span class="red f20">$ <strong
              id="AllPrice">{{order.totalFee}}</strong></span></p>
          </div>
        </div>
        <input name="score" value="0" type="hidden" id="usedScore">
        <button class="fr redb" type="button" id="submitPay" @click="toPay()">Pay</button>
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