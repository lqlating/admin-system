import request from '../request'

export const login = (data: { username: string; password: string }) => {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export const logout = () => {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
