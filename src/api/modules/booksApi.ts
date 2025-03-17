import axiosInstance from './axiosInstance'

export const booksApi = {
  getList(params: any) {
    return axiosInstance.get('/books', { params })
  },

  add(data: any) {
    return axiosInstance.post('/books', data)
  },

  update(id: number, data: any) {
    return axiosInstance.put(`/books/${id}`, data)
  },

  deleteBook(id: number) {
    return axiosInstance.delete(`/books/${id}`)
  }
}
