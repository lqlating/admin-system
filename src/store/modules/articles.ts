import { defineStore } from 'pinia'
import { getArticles, addArticle, updateArticle, deleteArticle } from '@/api/modules/articles'
import type { Article } from '@/types'

export const useArticleStore = defineStore('articles', {
  state: () => ({
    articleList: [] as Article[],
    loading: false
  }),

  actions: {
    async fetchArticles() {
      this.loading = true
      try {
        const res = await getArticles({})
        this.articleList = res.data
      } finally {
        this.loading = false
      }
    },

    async addArticle(data: Partial<Article>) {
      await addArticle(data)
      await this.fetchArticles()
    },

    async updateArticle(id: number, data: Partial<Article>) {
      await updateArticle(id, data)
      await this.fetchArticles()
    },

    async deleteArticle(id: number) {
      await deleteArticle(id)
      await this.fetchArticles()
    }
  }
})
