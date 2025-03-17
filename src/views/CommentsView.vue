<template>
  <div class="comments-container">
    <h2>评论管理</h2>
    <DataList
      :normal-data="normalComments"
      :pending-data="pendingComments"
      :reported-data="reportedComments"
    >
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="content" label="评论内容" show-overflow-tooltip />
      <el-table-column prop="user" label="评论用户" />
      <el-table-column prop="target" label="评论对象" />
      <el-table-column prop="date" label="评论时间" />
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

const normalComments = ref([
  {
    id: 1,
    content: '这篇文章写得很好！',
    user: '用户A',
    target: '《Vue3教程》',
    date: '2024-03-15',
    status: '已发布'
  },
  {
    id: 2,
    content: '学习了，感谢分享',
    user: '用户B',
    target: '《TypeScript入门》',
    date: '2024-03-14',
    status: '已发布'
  }
])

const pendingComments = ref([
  {
    id: 3,
    content: '待审核评论1',
    user: '用户C',
    target: '《Vue3教程》',
    date: '2024-03-13',
    status: '待审核'
  },
  {
    id: 4,
    content: '待审核评论2',
    user: '用户D',
    target: '《TypeScript入门》',
    date: '2024-03-12',
    status: '待审核'
  }
])

const reportedComments = ref([
  {
    id: 5,
    content: '被举报评论1',
    user: '用户E',
    target: '《Vue3教程》',
    date: '2024-03-11',
    status: '被举报'
  },
  {
    id: 6,
    content: '被举报评论2',
    user: '用户F',
    target: '《TypeScript入门》',
    date: '2024-03-10',
    status: '被举报'
  }
])

const handleEdit = (row: any) => {
  console.log('编辑', row)
}

const handleDelete = (row: any) => {
  console.log('删除', row)
}
</script>

<style scoped>
.comments-container {
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
