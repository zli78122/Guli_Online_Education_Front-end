import request from '@/utils/request'

export default {
    // 添加小节
    addVideo(video) {
        return request({
            url: '/eduservice/video/addVideo',
            method: 'post',
            data: video
        })
    },
    // 删除小节
    deleteVideo(id) {
        return request({
            url: '/eduservice/video/' + id,
            method: 'delete'
        })
    },
    // 根据id删除存储在阿里云服务器上的视频文件
    deleteAliyunVideo(id) {
        return request({
            url: '/eduvod/video/deleteVideo/' + id,
            method: 'delete'
        })
    }
}