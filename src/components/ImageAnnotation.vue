<script setup lang="ts">
import { ref } from 'vue'

const activeTool = ref('pointer')
const showROI = ref(true)


const annotations = ref([
  { id: 1, type: 'rectangle', name: 'rectangle 1' },
  { id: 2, type: 'polygon', name: 'polygon 2' }
])

const tools = [
  { id: 'pointer', icon: 'point.svg', label: '选择' },
  { id: 'line', icon: 'line.svg', label: '线段' },
  { id: 'rectangle', icon: 'square.svg', label: '矩形' },
  { id: 'circle', icon: 'circle.svg', label: '圆形' },
  { id: 'polygon', icon: 'polygon.svg', label: '多边形' }
]


</script>

<template>
  <div class="flex h-full">
    <!-- Left Toolbar -->
    <div class="w-64 bg-white border-r p-4 flex flex-col gap-6">
      <!-- Annotation Tools -->
      <div>
        <h3 class="text-base font-medium mb-3">标注工具</h3>
        <div class="grid grid-cols-3 gap-2 justify-items-center">
          <button
            v-for="tool in tools" :key="tool.id"
            class="aspect-square p-2 rounded border hover:bg-gray-50"
            :class="{ 'bg-yellow-200 text-gray-800 hover:bg-yellow-300': activeTool === tool.id }"
            @click="activeTool = tool.id"
          >
            <img class="w-6 h-6" :src="`/src/assets/icons/${tool.icon}`" :alt="tool.label" />
          </button>
        </div>
      </div>

      <!-- ROI Operations -->
      <div>
        <h3 class="text-base font-medium mb-3">ROI 操作</h3>
        <div class="space-y-3">
          <el-switch
            v-model="showROI"
            active-text="隐藏 ROI"
          />
          <div class="flex gap-2">
            <el-button type="danger" class="flex-1">
              <el-icon><Delete /></el-icon>
              清除 ROI
            </el-button>
            <el-button type="primary" class="flex-1">
              <el-icon><Download /></el-icon>
              导出 ROI
            </el-button>
          </div>
        </div>
      </div>

      <!-- Annotation List -->
      <div>
        <h3 class="text-base font-medium mb-3">标注列表</h3>
        <el-scrollbar height="200px">
          <div class="space-y-2">
            <div
              v-for="annotation in annotations"
              :key="annotation.id"
              class="flex items-center justify-between p-2 border rounded hover:bg-gray-50"
            >
              <div class="flex items-center gap-2">
                <el-icon v-if="annotation.type === 'rectangle'"><Rectangle /></el-icon>
                <el-icon v-else-if="annotation.type === 'polygon'"><Star /></el-icon>
                <span>{{ annotation.name }}</span>
              </div>
              <el-button type="text">
                <el-icon><More /></el-icon>
              </el-button>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>

    <!-- Main Image Area -->
    <div class="flex-1 bg-white flex items-center justify-center relative mx-auto">
      <div id="annotation-canvas" class="w-full h-full flex items-center justify-center mx-auto">
        <img src="/src/assets/infraredImg.png">
      </div>
      <!-- Annotation Hint -->
      <div class="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded">
        点击起始点完成多边形，或双击结束<br>
        按 ESC 取消
      </div>
    </div>
  </div>
</template>