<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '../components/Sidebar.vue'
import ImageAnnotation from '../components/ImageAnnotation.vue'
import PatientInfo from '../components/PatientInfo.vue'
import ImageList from '../components/ImageList.vue'
import ROIList from '../components/ROIList.vue'

var json = ref<any>([{
  "patientId": "1",
  "imageId": "",
  "roi": [
    {
      "id": "c38dba8c-73e1-4855-89f6-0fca869f0e2b",
      "label": "默认",
      "color": "#ff0000",
      "type": "rect",
      "index": 1,
      "pointList": [
        {
          "x": 79.78990854062653,
          "y": 110.60972915654132
        },
        {
          "x": 106.62704899924888,
          "y": 416.71939203817436
        }
      ]
    }
  ]
},
{
  "patientId": "2",
  "imageId": "if2",
  "roi": [
    {
      "id": "18002f2a-9093-4770-91c7-d317d485e5c6",
      "label": "默认",
      "color": "#ff0000",
      "type": "polygon",
      "index": 1,
      "pointList": [
        {
          "x": 39.00691468210135,
          "y": 179.56201122255118
        },
        {
          "x": 66.59512658507488,
          "y": 178.405050148014
        },
        {
          "x": 86.14609198957274,
          "y": 148.26817037069767
        },
        {
          "x": 107.05522909026642,
          "y": 157.38412936862107
        },
        {
          "x": 104.89221490743604,
          "y": 196.5866654884461
        },
        {
          "x": 43.98687756815269,
          "y": 245.1622630672028
        },
        {
          "x": 115.01981619758759,
          "y": 248.4431140370256
        },
        {
          "x": 150.64527459903678,
          "y": 226.5894048513233
        },
        {
          "x": 110.19635046171518,
          "y": 227.03095038218532
        },
        {
          "x": 133.17907480227984,
          "y": 200.73942915212302
        },
        {
          "x": 124.76176379622675,
          "y": 147.21740379092478
        },
        {
          "x": 78.13120222683692,
          "y": 117.82388547695845
        }
      ]
    }
  ]
}
])


const activeTab = ref('info')
// 引用 ImageAnnotation 组件实例，用于调用其内部方法
const imageAnnotationRef = ref<InstanceType<typeof ImageAnnotation> | null>(null)

/**
 * 处理从 ImageList 组件传递过来的图片选择事件
 * @param {string} imageSrc - 被选中图片的源路径
 */
// 存储不同患者对应的图片列表
const patientImages: Record<string, string[]> = {
  patient1: ["src/assets/infared/if1.jpg", "src/assets/infared/if2.jpg"],
  patient2: ["src/assets/infared/if3.jpg", "src/assets/infared/if4.jpg"],
  // 可根据需要添加更多患者的图片
};

// 当前患者的图片列表
const currentImageList = ref<string[]>(patientImages.patient1); // 默认显示第一个患者的图片

/**
 * 处理从 Sidebar 组件传递过来的患者选择事件
 * @param {string} patientId - 被选中患者的ID
 */
function handlePatientSelected(patientId: string) {
  currentImageList.value = patientImages[patientId] || [];
  // 默认选中新列表的第一张图片
  if (currentImageList.value.length > 0) {
    handleImageSelected(currentImageList.value[0]);
  }
}

/**
 * 处理从 ImageList 组件传递过来的图片选择事件
 * @param {{ imageSrc: string, imageId: string }} payload - 包含被选中图片的源路径和ID
 */
function handleImageSelected(imageSrc: string) {
  if (imageAnnotationRef.value) {
    imageAnnotationRef.value.setBackgroundImage(imageSrc)
  }
}

/**
 * 处理添加ROI事件
 */
function handleAddROI() {
  console.log('添加ROI')
  // 这里可以实现添加ROI的逻辑
}

/**
 * 处理删除ROI事件
 * @param {string} roiId - 要删除的ROI的ID
 */
function handleRemoveROI(roiId: string) {
  console.log('删除ROI', roiId)
  // 这里可以实现删除ROI的逻辑
}

/**
 * 处理导出ROI事件
 * @param {any[]} roiData - 要导出的ROI数据
 */
function handleExportROI(roiData: any[]) {
  console.log('导出ROI', roiData)
  // 这里可以实现导出ROI的逻辑
}
</script>

<template>
  <div class="flex-1 flex flex-col">
    <!-- Main Content -->
    <div class="flex-1 flex h-100">
      <!-- Left Sidebar -->
      <Sidebar class="flex-[0.5] w-64 bg-gray-100 border-r" @patient-selected="handlePatientSelected" />

      <!-- Center Content -->
      <div class="flex-[2.5] w-32">
        <ImageAnnotation ref="imageAnnotationRef" />
      </div>

      <!-- Right Panel -->
      <div class="flex-[1.5] w-120 bg-gray-50 border-l p-4 h-full">
        <el-tabs v-model="activeTab" class="h-full">
          <el-tab-pane label="患者信息" name="info">
            <PatientInfo />
          </el-tab-pane>
          <el-tab-pane label="ROI列表" name="roi">
            <ROIList :roi-data="json" @add-roi="handleAddROI" @remove-roi="handleRemoveROI" @export-roi="handleExportROI" />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <!-- Bottom Image List -->
    <ImageList class="h-64 bg-gray-100 border-t" :images="currentImageList" @image-selected="handleImageSelected" />
  </div>
</template>