<template>
  <div class="users-container">
    <h2>用户管理</h2>
    <DataList
      :normal-data="normalUsers"
      :pending-data="pendingUsers"
      :reported-data="reportedUsers"
    >
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="registerDate" label="注册时间" />
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
</script>

<style scoped>
.users-container {
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
