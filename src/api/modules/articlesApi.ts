import axiosInstance from './axiosInstance'

export const articlesApi = {
  getList(params: any) {
    return axiosInstance.get('/articles', { params })
  },

  add(data: any) {
    return axiosInstance.post('/articles', data)
  },

  update(id: number, data: any) {
    return axiosInstance.put(`/articles/${id}`, data)
  },

  deleteArticle(id: number) {
    return axiosInstance.delete(`/articles/${id}`)
  }
}
