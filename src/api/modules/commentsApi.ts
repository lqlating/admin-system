import request from '../request'

export const commentsApi = {
  getList(params: any) {
    return request({
      url: '/comments',
      method: 'get',
      params
    })
  },

  update(id: number, data: any) {
    return request({
      url: `/comments/${id}`,
      method: 'put',
      data
    })
  },

  delete(id: number) {
    return request({
      url: `/comments/${id}`,
      method: 'delete'
    })
  }
}
