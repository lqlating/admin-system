import axiosInstance from './axiosInstance' // 引入 axios 实例

export const commentsApi = {
  deleteComment(id: number) {
    return axiosInstance.delete(`/comments/${id}`) // 使用 axiosInstance 发送删除请求
  }
}
