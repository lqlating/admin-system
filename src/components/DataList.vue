<template>
  <div class="data-list">
    <el-tabs v-model="activeTab">
      <el-tab-pane v-if="showPending" label="待审核" name="pending">
        <el-table :data="pendingData" border style="width: 100%" @row-click="handleRowClick">
          <slot name="default" :row="{}" :activeTab="activeTab"></slot>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="被举报" name="reported">
        <el-table :data="reportedData" border style="width: 100%" @row-click="handleRowClick">
          <slot name="default" :row="{}" :activeTab="activeTab"></slot>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已封禁" name="banned">
        <el-table :data="normalData" border style="width: 100%" @row-click="handleRowClick">
          <slot name="default" :row="{}" :activeTab="activeTab"></slot>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, withDefaults } from 'vue'

interface Props<T = any> {
  pendingData: T[]
  reportedData: T[]
  normalData: T[]
  showPending?: boolean
  defaultActiveTab?: string
}

const props = withDefaults(defineProps<Props>(), {
  showPending: true,
  defaultActiveTab: 'pending'
})

const emit = defineEmits(['row-click'])

const activeTab = ref(props.defaultActiveTab)

const handleRowClick = (row: any) => {
  emit('row-click', row)
}
</script>

<style scoped>
.data-list {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

:deep(.el-tabs__nav-wrap::after) {
  height: 1px;
}

:deep(.el-table) {
  margin-top: 20px;
}
</style>