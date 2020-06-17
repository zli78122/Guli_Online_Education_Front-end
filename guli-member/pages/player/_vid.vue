<template>
  <div>
    <!-- 阿里云视频播放器样式 -->
    <link rel="stylesheet" href="https://g.alicdn.com/de/prismplayer/2.8.1/skins/default/aliplayer-min.css"/>
    <!-- 阿里云视频播放器脚本 -->
    <script charset="utf-8" type="text/javascript" src="https://g.alicdn.com/de/prismplayer/2.8.1/aliplayer-min.js"/>

    <!-- 定义播放器dom -->
    <div id="J_prismPlayer" class="prism-player" />
  </div>
</template>

<script>
import vod from '@/api/vod'

export default {
    layout: 'video',
    // asyncData is called every time before loading the page component.
    // It will be called server-side once (on the first request to the Nuxt app) and client-side when navigating to further routes.
    // 
    // 异步调用，只会调用一次
    //   params <=> this.$route.params
    //   params.id <=> this.$route.params.id
    asyncData({ params, error }) {
        // 根据视频id获取视频播放凭证
        return vod.getPlayAuth(params.vid)
            .then(response => {
                // 等价于
                //   this.playAuth = response.data.data.playAuth
                //   this.vid = params.vid
                return {
                    playAuth: response.data.data.playAuth,
                    vid: params.vid
                }
            })
    },
    // 在页面渲染之后执行
    mounted() {
        new Aliplayer({
            // dom id
            id: 'J_prismPlayer',
            // 视频id
            vid: this.vid,
            // 视频播放凭证
            playauth: this.playAuth,
            // 如果播放加密视频，则需设置encryptType=1，非加密视频无需设置此项
            encryptType: '1',
            // 宽度
            width: '100%',
            // 高度
            height: '480px',
            // 视频封面
            cover: 'https://zli78122-guli-edu.oss-us-west-1.aliyuncs.com/images/player%20cover.jpg',
            // 清晰度排序
            qualitySort: 'asc',
            // 媒体类别 (音频 or 视频)
            mediaType: 'video',
            // 自动播放
            autoplay: false,
            // 直播
            isLive: false,
            // 循环播放
            rePlay: false,
            // 预加载
            preload: true,
            // 控制条的显示方式：鼠标悬停
            controlBarVisibility: 'hover',
            // 播放器类型：html5
            useH5Prism: true,
        }, function(player) {
            console.log('播放器创建成功')
        })
    }
}
</script>