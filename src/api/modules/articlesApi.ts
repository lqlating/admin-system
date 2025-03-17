import request from '../request'

export const articlesApi = {
  getList(params: any) {
    return request({
      url: '/articles',
      method: 'get',
      params
    })
  },

  add(data: any) {
    return request({
      url: '/articles',
      method: 'post',
      data
    })
  },

  update(id: number, data: any) {
    return request({
      url: `/articles/${id}`,
      method: 'put',
      data
    })
  },

  delete(id: number) {
    return request({
      url: `/articles/${id}`,
      method: 'delete'
    })
  }
}
