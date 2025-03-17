import request from '../request'

export const getBooks = (params: any) => {
  return request({
    url: '/books',
    method: 'get',
    params
  })
}

export const addBook = (data: any) => {
  return request({
    url: '/books',
    method: 'post',
    data
  })
}

export const updateBook = (id: number, data: any) => {
  return request({
    url: `/books/${id}`,
    method: 'put',
    data
  })
}

export const deleteBook = (id: number) => {
  return request({
    url: `/books/${id}`,
    method: 'delete'
  })
}
