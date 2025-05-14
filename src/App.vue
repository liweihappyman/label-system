<script setup lang="ts">
import { ref } from 'vue'
import TopNavbar from './components/TopNavbar.vue'
import Sidebar from './components/Sidebar.vue'
import ImageAnnotation from './components/ImageAnnotation.vue'
import PatientInfo from './components/PatientInfo.vue'
import ImageList from './components/ImageList.vue'

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
},
{
  "patientId": "2",
  "imageId": "if3",
  "roi": [
    {
      "id": "7f4b3a3a-4563-477e-9872-ee0b90a75ec7",
      "label": "标签1",
      "color": "#ff0000",
      "type": "polygon",
      "index": 1,
      "pointList": [
        {
          "x": 42.307084787699374,
          "y": 147.07855785799495
        },
        {
          "x": 73.55179384085184,
          "y": 121.92673308885256
        },
        {
          "x": 108.86949365970042,
          "y": 148.93796668581274
        },
        {
          "x": 60.67428091724473,
          "y": 197.487352538329
        },
        {
          "x": 92.68267573896522,
          "y": 213.6575685945301
        },
        {
          "x": 107.48047099368179,
          "y": 243.7180113109177
        },
        {
          "x": 55.22886935006406,
          "y": 286.1191733309769
        },
        {
          "x": 67.23755136305394,
          "y": 298.4709605443379
        },
        {
          "x": 134.12646357089204,
          "y": 248.77051208412493
        },
        {
          "x": 103.58456678301594,
          "y": 195.07454822604163
        },
        {
          "x": 137.7512039941678,
          "y": 136.02725003313745
        },
        {
          "x": 68.11191622851588,
          "y": 92.8956059735784
        },
        {
          "x": 25.505997879202933,
          "y": 129.33116467105555
        }
      ],
      "select": false
    },
    {
      "id": "7a872fc1-c994-4a22-98eb-9b8a8fc148e8",
      "label": "标签2",
      "color": "#ff0000",
      "type": "polygon",
      "index": 2,
      "pointList": [
        {
          "x": 414.27739362877213,
          "y": 110.82561967039278
        },
        {
          "x": 414.24418989970394,
          "y": 294.2319511333009
        },
        {
          "x": 445.5110347722352,
          "y": 296.01388459329297
        },
        {
          "x": 447.5032585163257,
          "y": 112.44706843988865
        }
      ]
    }
  ]
},
{
  "patientId": "2",
  "imageId": "if4",
  "roi": [
    {
      "id": "2cfde431-472d-4211-b01c-dce534f82dbf",
      "label": "标签1",
      "color": "#ff0000",
      "type": "polygon",
      "index": 1,
      "pointList": [
        {
          "x": 73.58499756992002,
          "y": 160.9853863827155
        },
        {
          "x": 15.550413113595193,
          "y": 258.01221667476693
        },
        {
          "x": 76.04760747580966,
          "y": 257.28173463526707
        },
        {
          "x": 76.81129324437768,
          "y": 313.7557438253877
        },
        {
          "x": 102.94262802103123,
          "y": 314.5858370520921
        },
        {
          "x": 104.18223390624308,
          "y": 260.1981288384218
        },
        {
          "x": 132.9754009631953,
          "y": 260.0929836963725
        },
        {
          "x": 131.8188044006539,
          "y": 233.14262360270402
        },
        {
          "x": 108.73114478858304,
          "y": 234.84708169487033
        },
        {
          "x": 110.2253125966509,
          "y": 163.68042239208236
        }
      ]
    },
    {
      "id": "6cb7e8ce-252f-4230-9988-5b9086e81396",
      "label": "标签2",
      "color": "#ff0000",
      "type": "polygon",
      "index": 2,
      "pointList": [
        {
          "x": 78.07303494896831,
          "y": 194.20571731542438
        },
        {
          "x": 50.0435536605841,
          "y": 240.7628794238501
        },
        {
          "x": 77.314883135245,
          "y": 239.7169619582026
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
  patient1: ["src/assets/if1.jpg", "src/assets/if2.jpg"],
  patient2: ["src/assets/if3.jpg", "src/assets/if4.jpg"],
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
</script>

<template>
  <div class="flex flex-col h-screen">
    <!-- Top Navigation -->
    <TopNavbar />

    <!-- Main Content -->
    <div class="flex-1 flex">
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
            <div class="roi-list">
              <!-- ROI list content -->
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <!-- Bottom Image List -->
    <ImageList class="h-64 bg-gray-100 border-t" :images="currentImageList" @image-selected="handleImageSelected" />
  </div>
</template>