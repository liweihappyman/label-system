<script setup lang="ts">
import { ref, computed } from 'vue'

// 定义props，接收从父组件传递过来的ROI数据
const props = defineProps<{
  roiData?: any[]
}>()

// 定义组件发出的事件
const emit = defineEmits(['add-roi', 'remove-roi', 'export-roi'])

// 表格数据
const tableData = computed(() => {
  if (!props.roiData || props.roiData.length === 0) return []
  
  // 将ROI数据转换为表格数据格式
  return props.roiData.map((roi, index) => {
    // 模拟计算最高、最低和平均温度值
    // 实际应用中，这些值应该从ROI数据中获取或计算
    const highTemp = (35 + Math.random() * 3).toFixed(1)
    const lowTemp = (32 + Math.random() * 2).toFixed(1)
    const avgTemp = ((parseFloat(highTemp) + parseFloat(lowTemp)) / 2).toFixed(1)
    const diffTemp = (parseFloat(highTemp) - parseFloat(lowTemp)).toFixed(1)
    
    return {
      id: roi.id || index + 1,
      label: roi.label || '默认',
      highTemp: highTemp,
      lowTemp: lowTemp,
      avgTemp: avgTemp,
      diffTemp: diffTemp,
      reference: '36.5',
      type: roi.type || 'polygon',
      color: roi.color || '#ff0000'
    }
  })
})

// 处理添加ROI事件
function handleAddROI() {
  emit('add-roi')
}

// 处理删除ROI事件
function handleRemoveROI(row: { id: any; }) {
  emit('remove-roi', row.id)
}

// 处理导出ROI事件
function handleExportROI() {
  emit('export-roi', tableData.value)
}
</script>

<template>
  <div class="roi-list-container">
    <!-- ROI表格 -->
    <el-table :data="tableData" style="width: 100%" max-height="calc(100vh - 300px)" border>
      <!-- <el-table-column prop="id" label="ID"/> -->
      <el-table-column prop="label" label="标签" />
      <el-table-column label="最高">
        <template #default="scope">
          <span>{{ scope.row.highTemp }}℃</span>
        </template>
      </el-table-column>
      <el-table-column label="最低">
        <template #default="scope">
          <span>{{ scope.row.lowTemp }}℃</span>
        </template>
      </el-table-column>
      <el-table-column label="平均/差值">
        <template #default="scope">
          <div>{{ scope.row.avgTemp }}℃</div>
          <div class="text-xs text-gray-500">差值: {{ scope.row.diffTemp }}℃</div>
        </template>
      </el-table-column>
      <el-table-column label="参考值">
        <template #default="scope">
          <span>{{ scope.row.reference }}℃</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="danger" size="small" @click="handleRemoveROI(scope.row)" icon="Delete" circle />
        </template>
      </el-table-column>
    </el-table>
    
    <!-- 底部按钮区域 -->
    <div class="button-container mt-4 flex justify-between">
      <el-button type="primary" @click="handleAddROI" icon="Plus">添加ROI</el-button>
      <el-button type="success" @click="handleExportROI" icon="Download">导出ROI</el-button>
    </div>
  </div>
</template>

<style scoped>
.roi-list-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.button-container {
  margin-top: auto;
  padding-top: 10px;
}
</style>