<template>
  <div class="books-container">
    <h2>书籍管理</h2>
    <DataList
      :normal-data="normalBooks"
      :pending-data="pendingBooks"
      :reported-data="reportedBooks"
    >
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="title" label="书名" />
      <el-table-column prop="author" label="作者" />
      <el-table-column prop="status" label="状态" />
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </DataList>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DataList from '../components/DataList.vue'

interface Book {
  id: number
  title: string
  author: string
  status: string
}

const normalBooks = ref<Book[]>([
  { id: 1, title: '三体', author: '刘慈欣', status: '已上架' },
  { id: 2, title: '百年孤独', author: '加西亚·马尔克斯', status: '已上架' }
])

const pendingBooks = ref<Book[]>([
  { id: 3, title: '新书待审核', author: '张三', status: '待审核' },
  { id: 4, title: '待审核图书', author: '李四', status: '待审核' }
])

const reportedBooks = ref<Book[]>([
  { id: 5, title: '被举报图书', author: '王五', status: '被举报' },
  { id: 6, title: '违规图书', author: '赵六', status: '被举报' }
])

const handleEdit = (row: Book) => {
  console.log('编辑', row)
}

const handleDelete = (row: Book) => {
  console.log('删除', row)
}
</script>

<style scoped>
.books-container {
  min-height: calc(100vh - 40px);
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

:deep(.el-table .warning-row) {
  background: #fdf6ec;
}

:deep(.el-table .success-row) {
  background: #f0f9eb;
}

:deep(.el-table .danger-row) {
  background: #fef0f0;
}
</style>
