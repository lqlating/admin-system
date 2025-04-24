<template>
    <div class="books-container">
        <h2>书籍管理</h2>
        <DataList :pending-data="bookList" :reported-data="reportedBooks" :normal-data="bannedBooks">
            <template #default="{ data }">
                <el-table :data="data" @row-click="handleRowClick">
                    <el-table-column prop="book_id" label="ID" width="80" />
                    <el-table-column prop="book_title" label="书名" min-width="200" show-overflow-tooltip />
                    <el-table-column prop="book_writer" label="作者" min-width="120" show-overflow-tooltip />
                    <el-table-column prop="book_type" label="类型" min-width="100" />
                    <el-table-column label="状态" min-width="100">
                        <template #default="scope">
                            <el-tag :type="scope.row.is_banned ? 'danger' : 'warning'">
                                {{ scope.row.is_banned ? '已封禁' : '待审核' }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="180">
                        <template #default="scope">
                            <template v-if="!scope.row.is_banned">
                                <el-button size="small" type="success" @click.stop="handleApprove(scope.row.book_id)">
                                    通过
                                </el-button>
                                <el-button size="small" type="danger" @click.stop="handleBan(scope.row.book_id)">
                                    封禁
                                </el-button>
                            </template>
                            <template v-else>
                                <el-button size="small" type="primary" @click.stop="handleUnban(scope.row.book_id)">
                                    解封
                                </el-button>
                            </template>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </DataList>

        <!-- 添加BookDetail组件 -->
        <BookDetail v-if="selectedBookId" :book="selectedBook" @close="closeBookDetail" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import DataList from '../components/DataList.vue'
import BookDetail from '../components/book_detail/book_detail.vue'
import { useBooksStore } from '@/store/books'
import { ElMessage } from 'element-plus'
import type { Book } from '@/types/book'

const booksStore = useBooksStore()
const { bookList, bannedBooks } = storeToRefs(booksStore)
const { getBooks, setBookReviewedAndBanned, unbanBook } = booksStore

const reportedBooks = ref([])
const selectedBookId = ref<number | null>(null)

// 计算当前选中的书籍详情
const selectedBook = computed(() => {
    if (!selectedBookId.value) return null
    return [...bookList.value, ...bannedBooks.value].find(book => book.book_id === selectedBookId.value)
})

// 处理行点击事件
const handleRowClick = (row: Book) => {
    selectedBookId.value = row.book_id
}

// 关闭书籍详情
const closeBookDetail = () => {
    selectedBookId.value = null
}

const fetchData = async () => {
    try {
        await getBooks({ status: 'pending' })
        await getBooks({ status: 'banned' })
    } catch (error) {
        console.error('获取数据失败:', error)
        ElMessage.error('获取书籍失败')
    }
}

onMounted(fetchData)

const handleApprove = async (bookId: number) => {
    try {
        await setBookReviewedAndBanned(bookId)
        ElMessage.success('审核通过成功')
        await fetchData()
    } catch {
        ElMessage.error('操作失败')
    }
}

const handleBan = async (bookId: number) => {
    try {
        await setBookReviewedAndBanned(bookId)
        ElMessage.success('封禁成功')
        await fetchData()
    } catch {
        ElMessage.error('操作失败')
    }
}

const handleUnban = async (bookId: number) => {
    try {
        await unbanBook(bookId)
        ElMessage.success('解封成功')
        await fetchData()
    } catch {
        ElMessage.error('操作失败')
    }
}
</script>

<style scoped>
.books-container {
    min-height: calc(100vh - 40px);
    position: relative;
}

h2 {
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: 600;
    color: #303133;
    position: relative;
    padding-left: 12px;
}

h2::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 20px;
    width: 4px;
    background-color: #409eff;
    border-radius: 2px;
}

:deep(.el-button) {
    margin: 0 4px;
}

:deep(.el-tag) {
    margin: 0 4px;
}
</style>