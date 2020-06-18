import request from '@/utils/request'

export default {
  // 生成订单
  createOrders(courseId) {
    return request({
      url: '/eduorder/order/createOrder/' + courseId,
      method: 'post'
    })
  },
  // 根据订单号查询订单信息
  getOrdersInfo(id) {
    return request({
      url: '/eduorder/order/getOrderInfo/' + id,
      method: 'get'
    })
  },
  // 生成微信支付二维码
  generateQRCode(orderNo) {
    return request({
      url: '/eduorder/paylog/generateQRCode/' + orderNo,
      method: 'get'
    })
  },
  // 根据订单号查询订单状态
  queryPayStatus(orderNo) {
    return request({
      url: '/eduorder/paylog/queryPayStatus/' + orderNo,
      method: 'get'
    })
  }
}