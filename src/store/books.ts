import { defineStore } from 'pinia'
import { ref } from 'vue'
import { booksApi } from '@/api/modules/booksApi'

export const useBooksStore = defineStore('books', () => {
  const bookList = ref([])
  const loading = ref(false)

  const getBooks = async (params: any) => {
    loading.value = true
    try {
      const res = await booksApi.getList(params)
      bookList.value = res.data
    } finally {
      loading.value = false
    }
  }

  const addBook = async (data: any) => {
    await booksApi.add(data)
    await getBooks({})
  }

  const updateBook = async (id: number, data: any) => {
    await booksApi.update(id, data)
    await getBooks({})
  }

  const deleteBook = async (id: number) => {
    await booksApi.delete(id)
    await getBooks({})
  }

  return {
    bookList,
    loading,
    getBooks,
    addBook,
    updateBook,
    deleteBook
  }
})
