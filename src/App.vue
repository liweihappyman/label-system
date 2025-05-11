<script setup lang="ts">
import { ref } from 'vue'
import TopNavbar from './components/TopNavbar.vue'
import Sidebar from './components/Sidebar.vue'
import ImageAnnotation from './components/ImageAnnotation.vue'
import PatientInfo from './components/PatientInfo.vue'
import ImageList from './components/ImageList.vue'
import Test from './components/Test.vue'
import TestEditor from './components/Test-editor.vue'

const activeTab = ref('info')
</script>

<template>
  <!-- <TestEditor /> -->
  <!-- <Test /> -->
  
  <div class="flex flex-col h-screen">
    <!-- Top Navigation -->
    <TopNavbar />

    <!-- Main Content -->
    <div class="flex-1 flex">
      <!-- Left Sidebar -->
      <Sidebar class="flex-[0.5] w-64 bg-gray-100 border-r" />

      <!-- Center Content -->
      <div class="flex-[2] w-32">
        <ImageAnnotation />
      </div>

      <!-- Right Panel -->
      <div class="flex-[1.5] w-120 bg-gray-50 border-l p-4">
        <el-tabs v-model="activeTab" class="h-full">
          <el-tab-pane label="患者信息" name="info">
            <PatientInfo />
          </el-tab-pane>
          <el-tab-pane label="ROI列表" name="roi">
            <div class="roi-list">
              <!-- ROI list content -->
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <!-- Bottom Image List -->
    <ImageList class="h-64 bg-gray-100 border-t" />
  </div>
</template>