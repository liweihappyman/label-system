<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToImageCapture = () => {
  router.push('/image-capture')
}
</script>

<template>
  <div class="bg-white border-b px-4 py-2">
    <div class="flex items-center justify-between">
      <!-- Left Section -->
      <div class="space-x-2">
        <el-button>信息录入</el-button>
        <el-button type="primary" @click="goToImageCapture">图像采集</el-button>
      </div>

      <!-- Center Section -->
      

      <!-- Right Section -->
      <div class="space-x-2">
        <el-button>上传温度</el-button>
        <el-button type="primary">创建报告</el-button>
        <el-button>导出报告</el-button>
        <el-button>获取ROI</el-button>
      </div>
    </div>
  </div>
</template>