import request from '../request'

export const usersApi = {
  login(data: any) {
    return request({
      url: '/users/login',
      method: 'post',
      data
    })
  },

  logout() {
    return request({
      url: '/users/logout',
      method: 'post'
    })
  },

  getList(params: any) {
    return request({
      url: '/users',
      method: 'get',
      params
    })
  },

  update(id: number, data: any) {
    return request({
      url: `/users/${id}`,
      method: 'put',
      data
    })
  },

  delete(id: number) {
    return request({
      url: `/users/${id}`,
      method: 'delete'
    })
  }
}
