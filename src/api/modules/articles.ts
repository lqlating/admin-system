import request from '../request'

export const getArticles = (params: any) => {
  return request({
    url: '/articles',
    method: 'get',
    params
  })
}

export const addArticle = (data: any) => {
  return request({
    url: '/articles',
    method: 'post',
    data
  })
}

export const updateArticle = (id: number, data: any) => {
  return request({
    url: `/articles/${id}`,
    method: 'put',
    data
  })
}

export const deleteArticle = (id: number) => {
  return request({
    url: `/articles/${id}`,
    method: 'delete'
  })
}
