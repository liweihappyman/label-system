<script setup lang="ts">
// 导入Vue相关功能
import { onMounted, ref } from 'vue'
// 导入标注画布组件
import MarkCanvas from '../label-js'
// 导入默认背景图片
import bgImage from '../assets/infraredImg.png'
// 导入可拖拽组件
import draggable from 'vuedraggable'


// 画布移动状态
var moveStatus = ref<boolean>(false)
// 当前绘制类型(矩形/多边形等)
var drawType = ref<string>('')
// 标注画布实例
var mark = ref<MarkCanvas | null>(null)
// 选择模式状态
var selectStatus = ref<boolean>(true)

// 设置绘制类型
// @param type 绘制类型(rect/polygon等)
function setDrawType(type: any) {
  mark.value?.setDrawType(type)
}

// 是否显示标签输入框
var showLabel = ref<boolean>(false)
// 标签文本输入
var labelInput = ref<string>('pigs')
// 标签颜色选择
var colorInput = ref<string>('#ff0000')

// 标签回调函数
var labelCallback: any = null

// 清除标签输入
// 关闭标签输入框并清空回调
function clearLabel() {
  labelCallback(null)
  showLabel.value = false
}

// 确认标签输入
// 验证输入并提交标签数据
function enterLabel() {
  labelInput.value = labelInput.value.trim()
  colorInput.value = colorInput.value.trim()

  // 为空判断
  if (!labelInput.value) return alert('请输入标签')
  // 为空判断
  if (!colorInput.value) return alert('请输入颜色')

  // 调用回调函数提交标签数据
  labelCallback({
    label: labelInput.value,
    color: colorInput.value
  })
  showLabel.value = false
}


// 显示标签输入框
// @param callback 标签提交回调函数
// @param data 可选，已有的标签数据用于编辑
function showLabelInput(callback: any, data?: ObjectLabelData) {
  labelCallback = callback
  showLabel.value = true
  labelInput.value = data ? data.label : labelInput.value
  colorInput.value = data ? data.color : colorInput.value
}

var objectList = ref<any[]>([])

onMounted(() => {
  mark.value = new MarkCanvas({
    view: "mark-box",
    fill: "#b8b8b8"
  })

  // 画布移动状态监听  同步修改工具栏移动状态
  mark.value.app.on("onmove", (e) => {
    moveStatus.value = e.status
  })

  // 画布选中状态监听  同步修改工具栏选中状态
  mark.value.app.on("onselect", (e) => {
    selectStatus.value = e.status
  })

  // 画布绘制模式监听  同步修改工具栏绘制模式
  mark.value.app.on("ondraw", (e) => {
    drawType.value = e.type
  })

  // 标注对象完成通知
  mark.value.app.on("oncomplete", (e: ObjectCompleteHandle) => {
    showLabelInput(function (data?: ObjectLabelData | null) {
      if (data) {
        e.ok(data)
      } else {
        e.err()
      }
    })
  })

  // 监听标注对象变化
  mark.value.app.on("onchange", () => {
    objectList.value = JSON.parse(JSON.stringify(mark.value?.objects))
  })

  mark.value.setBackground(bgImage)
})

/**
 * 将画布标注数据转换为JSON格式
 * @returns {void} 无返回值，直接在控制台输出JSON数据
 */
function toJSON() {
  let json = mark.value!.toJSON()
  console.log(json)
}


// 存储标注数据的JSON字符串，包含多边形和矩形等标注信息
// 格式示例: [{index:1, type:'polygon', label:'测试', color:'#0000ff', pointList:[{x,y}...]}, ...]
var jsonValue = ref<string>('[{"index":1,"type":"polygon","label":"测试","color":"#0000ff","pointList":[{"x":589.7610921501706,"y":190.93517524797355},{"x":961.0921501706484,"y":187.4402813699872},{"x":963.7133372440272,"y":511.59047201631824},{"x":574.0341696885665,"y":496.73718969976534}]},{"index":2,"type":"polygon","label":"452","color":"#ff3838","pointList":[{"x":507.5775104955846,"y":367.9062590479178},{"x":733.6945664237803,"y":368.69680578342906},{"x":719.4633981566375,"y":620.1136795468802},{"x":400.8438992906432,"y":620.1136795468802}]},{"index":3,"type":"polygon","label":"2000","color":"#bafc03","pointList":[{"x":864.9373280895622,"y":286.472435518506},{"x":1149.5602711962554,"y":248.52272384548573},{"x":1109.238647879168,"y":663.5977310838199}]},{"index":4,"type":"polygon","label":"25252","color":"#ff14cc","pointList":[{"x":619.8454012449935,"y":123.60487893886025},{"x":745.553853206582,"y":333.11894543502393},{"x":1035.7110456980165,"y":137.83604720600303},{"x":702.0698016696424,"y":24.77750416204223}]},{"index":5,"type":"rect","label":"123123","color":"#ff0000","pointList":[{"x":283.96719303559905,"y":107.75259617537436},{"x":438.0344795796073,"y":243.91007553108827}]}]')

/**
 * 导入JSON数据到画布
 * 解析jsonValue中的JSON字符串并应用到画布
 * @returns {void} 无返回值，解析失败会弹出错误提示
 */
function importJSON() {
  try {
    let json = JSON.parse(jsonValue.value)
    mark.value?.setObjectData(json)
  } catch (err) {
    alert("JSON格式错误")
  }
}

/**
 * 清空画布
 * 移除所有标注对象
 * @returns {void} 无返回值
 */
function clearCanvas() {
  mark.value?.clear()
}

/**
 * 上传图片作为画布背景
 * 创建文件选择对话框，读取图片文件并设置为画布背景
 * @returns {void} 无返回值
 */
function uploadImage() {
  let input = document.createElement("input")
  input.type = "file"
  input.accept = "image/*"
  input.onchange = function (e) {
    let file = (e.target as any).files[0]
    if (file) {
      let reader = new FileReader()
      reader.onload = function (e) {
        mark.value?.setBackground((e.target as any).result)
      }
      reader.readAsDataURL(file)
    }
  }
  input.click()
}

// 拖拽状态标识
// true表示正在拖拽，false表示未拖拽
var dragStatus = ref<boolean>(false)


/**
 * 停止拖拽并重新排序对象
 * 根据当前对象列表的ID顺序重新排序画布中的对象
 * @returns {void} 无返回值
 */
function stopDrag() {
  mark.value?.sortObject(objectList.value.map(e => e.id))
}

/**
 * 通过ID选择标注对象
 * @param {string} id - 要选择的标注对象ID
 * @returns {void} 无返回值
 */
function selectObj(id: string) {
  mark.value?.selectObjectById(id)
}

/**
 * 设置标注对象的标签
 * @param {Event} e - 事件对象
 * @param {Object} el - 标注对象
 * @returns {void} 无返回值
 */
function setLabel(e: any, el: any) {
  e.preventDefault()
  showLabelInput(function (data?: ObjectLabelData | null) {
    if (data) {
      mark.value?.setObjectLabel(el.id, data)
    }
  }, el)
}

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
          <button v-for="tool in tools" :key="tool.id" class="aspect-square p-2 rounded border hover:bg-gray-50"
            :class="{ 'bg-yellow-200 text-gray-800 hover:bg-yellow-300': activeTool === tool.id }"
            @click="tool.id === 'rectangle' ? setDrawType('rect') : tool.id === 'polygon' ? setDrawType('polygon') : activeTool = tool.id">
            <img class="w-6 h-6" :src="`/src/assets/icons/${tool.icon}`" :alt="tool.label" />
          </button>
        </div>
      </div>

      <!-- ROI Operations -->
      <div>
        <h3 class="text-base font-medium mb-3">ROI 操作</h3>
        <div class="space-y-3">
          <el-switch v-model="showROI" active-text="隐藏 ROI" />
          <div class="flex gap-2">
            <el-button type="danger" class="flex-1">
              <el-icon>
                <Delete />
              </el-icon>
              清除 ROI
            </el-button>
            <el-button type="primary" class="flex-1" @click="toJSON">
              <el-icon>
                <Download />
              </el-icon>
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
            <div v-for="annotation in annotations" :key="annotation.id"
              class="flex items-center justify-between p-2 border rounded hover:bg-gray-50">
              <div class="flex items-center gap-2">
                <el-icon v-if="annotation.type === 'rectangle'">
                  <Rectangle />
                </el-icon>
                <el-icon v-else-if="annotation.type === 'polygon'">
                  <Star />
                </el-icon>
                <span>{{ annotation.name }}</span>
              </div>
              <el-button type="text">
                <el-icon>
                  <More />
                </el-icon>
              </el-button>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>

    <!-- Main Image Area -->
    <div class="flex-1 bg-white flex items-center justify-center relative mx-auto">
      <draggable v-model="objectList" group="people" @start="dragStatus = true" @end="stopDrag" item-key="id">
        <template #item="{ element }">
          <div @click="selectObj(element.id)" class="item" :class="{ active: element.select }"
            @contextmenu="(e) => setLabel(e, element)">
            <b :style="{ background: element.color }"></b>{{ element.label }}
          </div>
        </template>
      </draggable>
      <!-- <div id="annotation-canvas" class="w-full h-full flex items-center justify-center mx-auto">
        <img src="/src/assets/infraredImg.png">
      </div> -->
      <!-- Annotation Hint -->
      <div class="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded">
        点击起始点完成多边形，或双击结束<br>
        按 ESC 取消
      </div>
    </div>
  </div>

</template>
