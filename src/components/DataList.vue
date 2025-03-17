<template>
  <div class="data-list">
    <div class="header">
      <el-button-group class="filter-buttons">
        <el-button
          :type="currentType === 'normal' ? 'primary' : 'default'"
          @click="switchType('normal')"
        >
          正常列表
        </el-button>
        <el-button
          :type="currentType === 'pending' ? 'primary' : 'default'"
          @click="switchType('pending')"
        >
          待审核
        </el-button>
        <el-button
          :type="currentType === 'reported' ? 'primary' : 'default'"
          @click="switchType('reported')"
        >
          已举报
        </el-button>
      </el-button-group>
    </div>

    <el-table
      :data="currentData"
      style="width: 100%"
      border
      stripe
      highlight-current-row
      class="data-table"
    >
      <slot></slot>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface DataItem {
  id: number
  [key: string]: any
}

const props = defineProps<{
  normalData: DataItem[]
  pendingData: DataItem[]
  reportedData: DataItem[]
}>()

const currentType = ref('normal')

const currentData = computed(() => {
  switch (currentType.value) {
    case 'pending':
      return props.pendingData
    case 'reported':
      return props.reportedData
    default:
      return props.normalData
  }
})

const switchType = (type: string) => {
  currentType.value = type
}
</script>

<style scoped>
.data-list {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.header {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.filter-buttons {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
}

.data-table {
  margin-top: 20px;
}

:deep(.el-table th) {
  background-color: #f5f7fa;
  color: #606266;
  font-weight: 600;
  text-align: center;
}

:deep(.el-table td) {
  text-align: center;
}
</style>