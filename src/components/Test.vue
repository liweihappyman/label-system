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

// 当前激活的工具类型，默认为选择器
const activeTool = ref('selector')
// 是否显示ROI(感兴趣区域)的开关状态
const showROI = ref(true)
// 存储所有标注对象的数组
var objectList = ref<any[]>([])
// 当前选中的标注对象ID
var selectedAnnotationId = ref<string>('')

const tools = [
  { id: 'selector', icon: 'selector.svg', name: '选择' },
  { id: 'rectangle', icon: 'square.svg', name: '矩形', drawArg: 'rect' },
  { id: 'polygon', icon: 'polygon.svg', name: '多边形', drawArg: 'polygon' },
  { id: 'line', icon: 'line.svg', name: '直线', drawArg: 'line' },
  { id: 'circle', icon: 'circle.svg', name: '圆形', drawArg: 'circle' },
]

// 是否显示标签输入框
var showLabel = ref<boolean>(false)
// 标签颜色选择
var colorInput = ref<string>('#ff0000')

// 标签回调函数
var labelCallback: any = null

// 设置绘制类型
// @param type 绘制类型(rect/polygon/line等)
function setDrawType(type: any) {
  mark.value?.setDrawType(type)
}

// 清除标签输入
// 关闭标签输入框并清空回调
function clearLabel() {
  labelCallback(null)
  showLabel.value = false
}

// 确认标签输入
// 验证输入并提交标签数据
function enterLabel() {
  // 从预设颜色数组中循环取值
  colorInput.value = colorInput.value.trim() || '#ff0000'

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
    // console.log(objectList.value)
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
  showLabelInput(function (confirm) {
    if (confirm) {
      let object: any;
      for (object of objectList.value) {
        mark.value?.deleteObject(object.id)
      }
    }
  });
}

/**
 * 删除标注框
 * 移除选中的标注对象
 * @returns {void} 无返回值
 */
function deleteObject(id: string) {
  showLabelInput(function (confirm) {
    if (confirm) {
      mark.value?.deleteObject(id);
    }
  });
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
          <button v-for="tool in tools" :key="tool.id" class="aspect-square p-2 rounded border hover:bg-gray-50"
            :class="{ 'bg-yellow-200 text-gray-800 hover:bg-yellow-300': activeTool === tool.id }" @click="() => {
              activeTool = tool.id;
              if (tool.id === 'selector') {
                mark?.setSelectMode(!selectStatus);
                selectedAnnotationId = '';
              } else {
                setDrawType(tool.drawArg || tool.id);
              }
            }">
            <img class="w-6 h-6" :src="`/src/assets/icons/${tool.icon}`" :alt="tool.label" />
          </button>
        </div>
      </div>

      <!-- ROI Operations -->
      <div>
        <h3 class="text-base font-medium mb-3">ROI 操作</h3>
        <div class="space-y-3">
          <!-- <el-switch v-model="showROI" active-text="隐藏 ROI" inactive-text="显示 ROI" /> -->
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
              <el-button class="w-full"
                :type="activeTool === 'selector' && selectedAnnotationId === annotation.id ? 'primary' : 'default'"
                @click="selectObj(annotation.id)">
                <span class="w-8 text-left">{{ annotation.index }}</span>
                <span class="flex-1 text-center">
                  {{ annotation.type === 'rect' ? '矩形' : annotation.type === 'line' ? '直线'
                    : annotation.type === 'polygon' ? '多边形' : annotation.type === 'circle' ? '圆形' : '' }}
                </span>
              </el-button>
              <el-button type="text" v-if="activeTool === 'selector' && selectedAnnotationId === annotation.id"
                @click="deleteObject(annotation.id)">
                <el-icon style="color: red">
                  <Delete />
                </el-icon>
              </el-button>
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