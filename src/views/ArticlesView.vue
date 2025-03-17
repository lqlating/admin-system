<template>
  <div class="articles-container">
    <h2>文章管理</h2>
    <DataList
      :normal-data="normalArticles"
      :pending-data="pendingArticles"
      :reported-data="reportedArticles"
    >
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="author" label="作者" />
      <el-table-column prop="date" label="发布日期" />
      <el-table-column prop="status" label="状态" />
      <el-table-column label="操作">
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

const normalArticles = ref([
  { id: 1, title: 'Vue3教程', author: '张三', date: '2024-03-15', status: '已发布' },
  { id: 2, title: 'TypeScript入门', author: '李四', date: '2024-03-14', status: '已发布' }
])

const pendingArticles = ref([
  { id: 3, title: '待审核文章1', author: '王五', date: '2024-03-13', status: '待审核' },
  { id: 4, title: '待审核文章2', author: '赵六', date: '2024-03-12', status: '待审核' }
])

const reportedArticles = ref([
  { id: 5, title: '被举报文章1', author: '田七', date: '2024-03-11', status: '被举报' },
  { id: 6, title: '被举报文章2', author: '周八', date: '2024-03-10', status: '被举报' }
])

const handleEdit = (row: any) => {
  console.log('编辑', row)
}

const handleDelete = (row: any) => {
  console.log('删除', row)
}
</script>

<style scoped>
.articles-container {
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
</style>
