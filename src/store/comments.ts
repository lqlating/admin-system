import { defineStore } from 'pinia'
import { ref } from 'vue'
import { commentsApi } from '@/api/modules/commentsApi'

export const useCommentsStore = defineStore('comments', () => {
  const commentList = ref([])
  const loading = ref(false)

  const getComments = async (params: any) => {
    loading.value = true
    try {
      const res = await commentsApi.getList(params)
      commentList.value = res.data
    } finally {
      loading.value = false
    }
  }

  const updateComment = async (id: number, data: any) => {
    await commentsApi.update(id, data)
    await getComments({})
  }

  const deleteComment = async (id: number) => {
    await commentsApi.deleteComment(id)
    await getComments({})
  }

  return {
    commentList,
    loading,
    getComments,
    updateComment,
    deleteComment
  }
}) 