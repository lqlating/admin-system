import { defineStore } from 'pinia'
import { ref } from 'vue'
import { articlesApi } from '@/api/modules/articlesApi'

export const useArticlesStore = defineStore('articles', () => {
    const articleList = ref([])
    const loading = ref(false)

    const getArticles = async (params: any) => {
        loading.value = true
        try {
            const res = await articlesApi.getList(params)
            articleList.value = res.data
        } finally {
            loading.value = false
        }
    }

    const addArticle = async (data: any) => {
        await articlesApi.add(data)
        await getArticles({})
    }

    const updateArticle = async (id: number, data: any) => {
        await articlesApi.update(id, data)
        await getArticles({})
    }

    const deleteArticle = async (id: number) => {
        await articlesApi.deleteArticle(id)
        await getArticles({})
    }

    return {
        articleList,
        loading,
        getArticles,
        addArticle,
        updateArticle,
        deleteArticle
    }
}) 