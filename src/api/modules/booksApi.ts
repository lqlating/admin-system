import request from '../request'

export const booksApi = {
  getList(params: any) {
    return request({
      url: '/books',
      method: 'get',
      params
    })
  },

  add(data: any) {
    return request({
      url: '/books',
      method: 'post',
      data
    })
  },

  update(id: number, data: any) {
    return request({
      url: `/books/${id}`,
      method: 'put',
      data
    })
  },

  delete(id: number) {
    return request({
      url: `/books/${id}`,
      method: 'delete'
    })
  }
}
