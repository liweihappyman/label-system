<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElButton, ElSelect, ElOption, ElSlider, ElCheckbox } from 'element-plus'
import 'element-plus/dist/index.css'

// 患者信息
const patientInfo = reactive({
    name: '',
    age: '',
    gender: '女',
    hospitalId: '',
    visitId: ''
})

// 模拟患者列表数据
const patientList = ref([
    { id: '001', name: '张三', avatar: '/src/assets/icons/avatar1.png' },
    { id: '002', name: '李四', avatar: '/src/assets/icons/avatar1.png' },
    { id: '003', name: '王五', avatar: '/src/assets/icons/avatar1.png' },
    { id: '004', name: '赵六', avatar: '/src/assets/icons/avatar1.png' },
])

// 人体站位示意图
const bodyPositions = ref([
    { name: '正面', image: '/src/assets/indicate/indicate1.png' },
    { name: '特写', image: '/src/assets/indicate/indicate2.png' },
    { name: '背面', image: '/src/assets/indicate/indicate3.png' },
    { name: '左侧', image: '/src/assets/indicate/indicate4.png' },
    { name: '右侧', image: '/src/assets/indicate/indicate5.png' },
])

// 已采集的图像列表
const capturedImages = ref([
    { src: '/src/assets/infared/if1.jpg', timestamp: new Date() },
    { src: '/src/assets/infared/if2.jpg', timestamp: new Date() },
    { src: '/src/assets/infared/if3.jpg', timestamp: new Date() },
])

// 当前选中的图像索引
const currentImageIndex = ref(0)

// 当前显示的图像
const currentImage = ref(capturedImages.value[0]?.src || '')

// 焦距值
const focusValue = ref(50)

// 显示选项
const showOptions = ref({
    showGrid: false,
    showScale: true,
    showTemp: false
})

// 选择患者
function selectPatient(patient: any) {
    console.log('选择患者:', patient)
    // 这里可以加载该患者的图像数据
}

// 选择图像
function selectImage(index: number) {
    currentImageIndex.value = index
    currentImage.value = capturedImages.value[index].src
}

// 抓取图像
function captureImage() {
    console.log('抓取图像')
    // 这里可以实现图像抓取逻辑，例如调用摄像头API
    // 模拟添加一张新图片
    const newImage = { src: '/src/assets/if' + (capturedImages.value.length % 8 + 1) + '.jpg', timestamp: new Date() }
    capturedImages.value.push(newImage)
    selectImage(capturedImages.value.length - 1)
}

// 删除图像
function deleteImage() {
    if (capturedImages.value.length > 0 && currentImageIndex.value >= 0) {
        capturedImages.value.splice(currentImageIndex.value, 1)
        if (capturedImages.value.length > 0) {
            selectImage(Math.min(currentImageIndex.value, capturedImages.value.length - 1))
        } else {
            currentImage.value = ''
            currentImageIndex.value = -1
        }
    }
}

// 创建新图像
function createNewImage() {
    console.log('创建新图像')
    // 实现创建新图像的逻辑
}

// 图像矫正
function correctImage() {
    console.log('图像矫正')
    // 实现图像矫正的逻辑
}

// 上传数据
function uploadData() {
    console.log('上传数据')
    // 实现数据上传的逻辑
}

onMounted(() => {
    console.log('图像采集组件已加载')
})
</script>

<template>
    <div class="image-capture-container">
        <!-- 左侧患者信息列表 -->
        <el-card class="patient-info-panel">
            <div class="panel-header">患者信息</div>
            <el-form :model="patientInfo" label-width="80px" class="mt-10">
                <el-form-item label="姓名">
                    <el-input v-model="patientInfo.name" />
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model="patientInfo.age" />
                </el-form-item>
                <el-form-item label="性别">
                    <el-select v-model="patientInfo.gender" placeholder="请选择">
                        <el-option label="男" value="男" />
                        <el-option label="女" value="女" />
                    </el-select>
                </el-form-item>
                <el-form-item label="住院号">
                    <el-input v-model="patientInfo.hospitalId" />
                </el-form-item>
                <el-form-item label="就诊号">
                    <el-input v-model="patientInfo.visitId" />
                </el-form-item>
            </el-form>

        </el-card>

        <!-- 中间图像采集区 -->
        <div class="image-capture-area">
            <!-- 站位示意图 -->
            <el-card class="position-diagram flex-[1]">
                <div class="diagram-title">站位示意图</div>
                <div class="diagram-content w-full">
                    <el-scrollbar class="scrollbar-container" max-height="720px" w-full>
                        <!-- 人体示意图列表 -->
                        <div class="body-diagram-list flex flex-col">
                            <el-image v-for="(position, index) in bodyPositions" :key="index"
                                :src="position.image"
                                :alt="position.name" fit="contain"
                                class="body-diagram flex-row items-center justify-center w-full" />
                        </div>
                    </el-scrollbar>
                </div>
            </el-card>

            <!-- 图像显示区域 -->
            <div class="image-display flex-[3]">
                <el-card class="thermal-image">
                    <el-image :src="currentImage" alt="热成像图" v-if="currentImage" fit="contain"
                        style="width: 100%; height: 100%" />
                    <el-empty description="请选择或采集图像" v-else />
                </el-card>
            </div>

            <!-- 实拍图列表 -->
            <el-card class="captured-images flex-[1]">
                <template #header>
                    <div class="images-title">实拍图列表</div>
                </template>
                <el-scrollbar class="images-list">
                    <el-image v-for="(image, index) in capturedImages" :key="index" :src="image.src"
                        :alt="`实拍图${index + 1}`" :class="{ active: currentImageIndex === index }"
                        @click="selectImage(index)" fit="cover" class="image-item" />
                </el-scrollbar>
            </el-card>
        </div>

        <!-- 右侧图像处理区 -->
        <el-card class="image-processing-panel">
            <template #header>
                <div class="panel-header">图像处理</div>
            </template>
            <div class="processing-controls">
                <el-space direction="vertical" size="large">
                    <el-space>
                        <el-button type="primary" @click="captureImage">图像抓取</el-button>
                        <el-button type="danger" @click="deleteImage">删除</el-button>
                    </el-space>
                    <el-button @click="createNewImage">新图像</el-button>
                    <el-button @click="correctImage">图像矫正</el-button>
                    <el-form-item label="调整焦距">
                        <el-slider v-model="focusValue" :min="0" :max="100" />
                    </el-form-item>
                    <el-button type="success" @click="uploadData">上传数据</el-button>
                    <el-form-item>
                        <el-checkbox-group v-model="showOptions">
                            <el-checkbox label="显示网格" name="showGrid" />
                            <el-checkbox label="显示刻度" name="showScale" />
                            <el-checkbox label="显示温度" name="showTemp" />
                        </el-checkbox-group>
                    </el-form-item>
                </el-space>
            </div>
        </el-card>
    </div>
</template>

<style scoped>
.image-capture-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    background-color: #f5f5f5;
}

/* 左侧患者信息面板 */
.patient-info-panel {
    width: 250px;
    background-color: white;
    border-right: 1px solid #e0e0e0;
    display: flex;
    flex-direction: column;
}

.panel-header {
    padding: 15px;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 1px solid #e0e0e0;
}

.patient-form {
    padding: 15px;
}

.form-item {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
}

.form-item label {
    width: 60px;
    text-align: right;
    margin-right: 10px;
}

.form-item input,
.form-item .el-select {
    flex: 1;
    height: 30px;
}


/* 中间图像采集区 */
.image-capture-area {
    flex: 1;
    display: flex;
    flex-direction: row;
    gap: 5px;
    margin-left: 15px;
    height: 100%;
}

.position-diagram {
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    height: 100%;
}

.diagram-title {
    padding: 10px;
    border-bottom: 1px solid #e0e0e0;
    font-weight: bold;
}

.diagram-content {
    padding: 10px;
    display: flex;
}

.body-diagram-list {
    width: 100%;
    display: flex;
    padding-right: 40px;
    gap: 10px;
    flex: 1;
    overflow-y: auto;
}

.body-diagram {
    width: 100px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
}

.body-diagram img {
    max-width: 100%;
    max-height: 100%;
}

.image-display {
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    height: 100%;
}

.thermal-image {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.thermal-image img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.no-image {
    color: #888;
    font-size: 18px;
}

.captured-images {
    height: 120px;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.images-title {
    padding: 10px;
    border-bottom: 1px solid #e0e0e0;
    font-weight: bold;
}

.images-list {
    display: flex;
    padding: 10px;
    gap: 10px;
    overflow-x: auto;
    height: calc(100% - 40px);
}

.image-item {
    width: 80px;
    height: 80px;
    border: 2px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
}

.image-item.active {
    border-color: #409EFF;
}

.image-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* 右侧图像处理区 */
.image-processing-panel {
    width: 200px;
    background-color: white;
    border-left: 1px solid #e0e0e0;
}

.processing-controls {
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.control-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.control-label {
    font-weight: bold;
    margin-bottom: 5px;
}

.checkboxes {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>