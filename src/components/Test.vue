<script setup lang="ts">
// 导入Vue相关功能
import { onMounted, ref } from 'vue'
// 导入标注画布组件
import MarkCanvas from '../label-js'
// 导入默认背景图片
import bgImage from '../assets/infraredImg.png'


// 画布移动状态
var moveStatus = ref<boolean>(false)
// 当前绘制类型(矩形/多边形等)
var drawType = ref<string>('')
// 标注画布实例
var mark = ref<MarkCanvas | null>(null)
// 选择模式状态
var selectStatus = ref<boolean>(true)

const activeTool = ref('selector')
const showROI = ref(true)


var objectList = ref<any[]>([])
var selectedAnnotationId = ref<string>('')
// 存储标注数据的JSON字符串，包含多边形和矩形等标注信息
// 格式示例: [{index:1, type:'polygon', label:'测试', color:'#0000ff', pointList:[{x,y}...]}, ...]
var jsonValue = ref<string>('[{"index":1,"type":"polygon","label":"测试","color":"#0000ff","pointList":[{"x":589.7610921501706,"y":190.93517524797355},{"x":961.0921501706484,"y":187.4402813699872},{"x":963.7133372440272,"y":511.59047201631824},{"x":574.0341696885665,"y":496.73718969976534}]},{"index":2,"type":"polygon","label":"452","color":"#ff3838","pointList":[{"x":507.5775104955846,"y":367.9062590479178},{"x":733.6945664237803,"y":368.69680578342906},{"x":719.4633981566375,"y":620.1136795468802},{"x":400.8438992906432,"y":620.1136795468802}]},{"index":3,"type":"polygon","label":"2000","color":"#bafc03","pointList":[{"x":864.9373280895622,"y":286.472435518506},{"x":1149.5602711962554,"y":248.52272384548573},{"x":1109.238647879168,"y":663.5977310838199}]},{"index":4,"type":"polygon","label":"25252","color":"#ff14cc","pointList":[{"x":619.8454012449935,"y":123.60487893886025},{"x":745.553853206582,"y":333.11894543502393},{"x":1035.7110456980165,"y":137.83604720600303},{"x":702.0698016696424,"y":24.77750416204223}]},{"index":5,"type":"rect","label":"123123","color":"#ff0000","pointList":[{"x":283.96719303559905,"y":107.75259617537436},{"x":438.0344795796073,"y":243.91007553108827}]}]')

const tools = [
  { id: 'pointer', icon: 'point.svg', label: '选择' },
  { id: 'line', icon: 'line.svg', label: '线段' },
  { id: 'rectangle', icon: 'square.svg', label: '矩形' },
  { id: 'circle', icon: 'circle.svg', label: '圆形' },
  { id: 'polygon', icon: 'polygon.svg', label: '多边形' }
]

// 设置绘制类型
// @param type 绘制类型(rect/polygon等)
function setDrawType(type: any) {
  mark.value?.setDrawType(type)
}

// 是否显示标签输入框
var showLabel = ref<boolean>(false)
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
  colorInput.value = colorInput.value.trim()

  // 调用回调函数提交标签数据
  labelCallback({
    color: colorInput.value,
    index: mark.value?.objects.length || 0,
    type: mark.value?.currentDrawingType || '',
    pointList: mark.value?.selectObject?.pointList || []
  })
  showLabel.value = false
}

// 显示标签输入框
// @param callback 标签提交回调函数
// @param data 可选，已有的标签数据用于编辑
function showLabelInput(callback: any) {
  labelCallback = callback
  showLabel.value = true
}

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
    showLabelInput(function (data?: MarkObjectJSON | null) {
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
    console.log(objectList.value)
  })
  
  // 监听标注对象删除事件
  mark.value.app.on("ondelete", (e) => {
    objectList.value = objectList.value.filter(obj => obj.id !== e.id)
  })

  mark.value.setBackground(bgImage)
})

/**
 * 将画布标注数据转换为JSON格式
 * @returns {void} 无返回值，直接在控制台输出JSON数据
 */
function toJSON() {
  let json = JSON.parse(JSON.stringify(mark.value?.objects))
  console.log(json)
}

/**
 * 导入JSON数据到画布
 * 解析jsonValue中的JSON字符串并应用到画布
 * @returns {void} 无返回值，解析失败会弹出错误提示
 */
function importJSON() {
  try {
    let json = JSON.parse(jsonValue.value);
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

/**
 * 通过ID选择标注对象
 * @param {string} id - 要选择的标注对象ID
 * @returns {void} 无返回值
 */
 function selectObj(id: string) {
  mark.value?.setSelectMode(true)
  mark.value?.selectObjectById(id)
  activeTool.value = 'selector'
  selectedAnnotationId.value = id
}

</script>
<template>
  <div class="flex h-full">
    <!-- Left Toolbar -->
    <div class="w-64 bg-white border-r p-4 flex flex-col gap-6">
      <!-- Annotation Tools -->
      <div>
        <h3 class="text-base font-medium mb-3">标注工具</h3>
        <div class="grid grid-cols-3 gap-2 justify-items-center">
          <button class="aspect-square p-2 rounded border hover:bg-gray-50"
            :class="{ 'bg-yellow-200 text-gray-800 hover:bg-yellow-300': activeTool === 'selector' }"
            @click="activeTool = 'selector'; mark?.setSelectMode(!selectStatus)">
            <img class="w-6 h-6" src="/src/assets/icons/selector.svg" alt="选择" />
          </button>
          <!-- <button class="aspect-square p-2 rounded border hover:bg-gray-50"
            :class="{ 'bg-yellow-200 text-gray-800 hover:bg-yellow-300': activeTool === 'line' }"
            @click="activeTool = 'line'">
            <img class="w-6 h-6" src="/src/assets/icons/line.svg" alt="线段" /> 
          </button> -->
          <button class="aspect-square p-2 rounded border hover:bg-gray-50"
            :class="{ 'bg-yellow-200 text-gray-800 hover:bg-yellow-300': activeTool === 'rectangle' }"
            @click="activeTool = 'rectangle'; setDrawType('rect')">
            <img class="w-6 h-6" src="/src/assets/icons/square.svg" alt="矩形" />
          </button>
          <!-- <button class="aspect-square p-2 rounded border hover:bg-gray-50"
            :class="{ 'bg-yellow-200 text-gray-800 hover:bg-yellow-300': activeTool === 'circle' }"
            @click="activeTool = 'circle'">
            <img class="w-6 h-6" src="/src/assets/icons/circle.svg" alt="圆形" />
          </button> -->
          <button class="aspect-square p-2 rounded border hover:bg-gray-50"
            :class="{ 'bg-yellow-200 text-gray-800 hover:bg-yellow-300': activeTool === 'polygon' }"
            @click="activeTool = 'polygon'; setDrawType('polygon')">
            <img class="w-6 h-6" src="/src/assets/icons/polygon.svg" alt="多边形" />
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
            inactive-text="显示 ROI"
          />
          <div class="flex gap-2">
            <el-button type="danger" class="flex-1" @click="clearCanvas">
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
        <el-scrollbar height="400px">
          <div class="space-y-2 object-list">          
            <div v-for="annotation in objectList" :key="annotation.id" 
              class="flex items-center justify-between p-2 border rounded hover:bg-gray-50">
              <el-button 
                class="w-full" 
                :type="selectedAnnotationId === annotation.id ? 'primary' : 'default'"
                @click="selectObj(annotation.id)"
              >
                <span class="w-8 text-left">{{ annotation.index }}</span>
                <span class="flex-1 text-center">{{ annotation.type === 'rect' ? '矩形' : '多边形' }}</span>
              </el-button>
              <!-- <el-button type="text">
                <el-icon><More /></el-icon>
              </el-button> -->
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>

    <!-- Main Image Area -->
    <div class="label-mark" v-show="showLabel" @click="clearLabel"></div>
    <div class="label-input" v-show="showLabel">
      <button @click="clearLabel">取消</button>
      <button @click="enterLabel">提交</button>
    </div>
    <div class="mark-box">
      <div id="mark-box" />
    </div>
  </div>

</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.label-mark {
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 8;
}

.label-input {
  position: fixed;
  padding: 20px;
  background: white;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  input[type="color"] {
    width: 100%;
    margin-bottom: 15px;
  }

  button {
    padding: 8px 15px;
    margin: 0 5px;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    cursor: pointer;
    color: white;
    font-weight: bold;

    &:hover {
      opacity: 0.9;
    }
  }

  button:first-child {
    background: #ff4d4f;

    &:hover {
      background: #ff7875;
    }
  }

  button:last-child {
    background: #52c41a;

    &:hover {
      background: #73d13d;
    }
  }
}

.tools_bar {
  display: flex;
  align-items: center;
  justify-content: center;
}

.tools_bar .b {
  height: 26px;
  width: 2px;
  background: rgb(219, 219, 219);
  margin: 0 20px;
}

.tools_bar button {
  margin: 5px;
  padding: 4px 8px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: #ccc;
  outline: none;
}

.tools_bar button.active {
  background: #000;
}

.tools_bar button.active svg path {
  fill: #fff;
}

.tools_bar svg {
  width: 20px;
  height: 20px;
}

.mark-box {
  display: flex;
  height: 700px;
  width: 100%;
}

#mark-box {
  flex: 1;
  height: 700px;
  overflow: hidden;
  margin-right: 15px;
  /* cursor: none; */
}

.object-list {
  width: 200px;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  border-left: 1px solid #dcdcdc;
}

.object-list .item {
  background: rgb(197, 197, 197);
  text-align: left;
  padding: 0 10px;
  height: 30px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 30px;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 2px;
}


.object-list .item b {
  display: inline-block;
  width: 15px;
  height: 15px;
  margin-right: 10px;
  vertical-align: middle;
  margin-top: -1px;
}

.object-list .item:hover {
  background: #989898;
}

.object-list .item.active {
  background: rgb(27, 27, 27);
  color: #fff;
}
</style>