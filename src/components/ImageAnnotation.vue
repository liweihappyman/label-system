<script setup lang="ts">
// 导入Vue相关功能
import { onMounted, ref, defineExpose } from 'vue'
// 导入标注画布组件
import MarkCanvas from '../label-js'
// 导入默认背景图片
import bgImage from '../assets/infraredImg.png'

var if1 = ref<any>({
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
      ],
      "select": false
    }
  ]
})

var if2 = ref<any>({
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
      ],
      "select": false
    }
  ]
})

var if3 = ref<any>({
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
            ],
            "select": false
        }
    ]
})

var if4 = ref<any>({
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
            ],
            "select": false
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
            ],
            "select": true
        }
    ]
})


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
// 标签文本输入
var labelInput = ref<string>('默认')
// 标签颜色选择
var colorInput = ref<string>('#ff0000')
// 预设标签列表
const presetLabels = ref([
  { value: '标签1' },
  { value: '标签2' },
  { value: '标签3' },
  // 根据需要添加更多预设标签
])

// 是否显示标签输入框
var showLabel = ref<boolean>(false)
// 是否显示标签选择框
var showSelectInput = ref<boolean>(false)
// 当前图片ID
var imageId = ref<string>('')
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
  // 调用回调函数提交标签数据
  labelCallback({
    label: labelInput.value,
    color: colorInput.value,
    index: mark.value?.objects.length || 0,
    type: mark.value?.currentDrawingType || '',
    pointList: mark.value?.selectObject?.pointList || [],
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
    fill: "#f8f8f8"
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
    showSelectInput.value = true
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
  let json = {
    patientId: '1',
    imageId: imageId.value,
    roi: JSON.parse(JSON.stringify(mark.value?.objects))
  }
  console.log(json)
}

/**
 * 导入JSON数据到画布
 * 解析jsonValue中的JSON字符串并应用到画布
 * @returns {void} 无返回值，解析失败会弹出错误提示
 */
function importJSON() {
  try {
    // let json = JSON.parse(jsonValue.value);
    // mark.value?.setObjectData(json)
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
  showSelectInput.value = false
  showLabelInput(function (confirm: any) {
    if (confirm) {
      deleteAllObject();
    }
  });
}

/**
 * 删除标注框
 * 移除选中的标注对象
 * @returns {void} 无返回值
 */
function deleteObject(id: string) {
  showSelectInput.value = false
  showLabelInput(function (confirm: any) {
    if (confirm) {
      mark.value?.deleteObject(id);
    }
  });
}

/**
 * 删除所有标注框
 * 移除所有的标注对象
 * @returns {void} 无返回值
 */
function deleteAllObject() {
  let object: any;
  for (object of objectList.value) {
    mark.value?.deleteObject(object.id)
  }
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

/**
 * 设置画布背景图片
 * @param {string} newImageSrc - 新的图片源路径或DataURL
 */
function setBackgroundImage(newImageSrc: string) {
  try {
    if (mark.value && newImageSrc) {
      mark.value.setBackground(newImageSrc);
      imageId.value = newImageSrc?.split('/').pop()?.split('.')[0] || '';
      deleteAllObject();
      if (imageId.value === 'if1') {
        mark.value?.setObjectData(if1.value.roi);
      } else if (imageId.value === 'if2') {
        mark.value?.setObjectData(if2.value.roi);
      } else if (imageId.value === 'if3') {
        mark.value?.setObjectData(if3.value.roi);
      } else if (imageId.value === 'if4') {
        mark.value?.setObjectData(if4.value.roi);
      }
    }
  } catch (error) {
    console.error('Failed to set background image:', error);
  }
}

// 暴露给父组件的方法，用于设置画布背景图片
// @param {string} newImageSrc - 新的图片URL或DataURL
defineExpose({
  setBackgroundImage
});
</script>

<template>
  <div class="flex h-full">
    <!-- Left Toolbar -->
    <div class="w-72 bg-white border-r p-4 flex flex-col gap-6">
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
            <img class="w-6 h-6" :src="`/src/assets/icons/${tool.icon}`" :alt="tool.name" />
          </button>
        </div>
      </div>

      <!-- ROI Operations -->
      <div>
        <h3 class="text-base font-medium mb-3">ROI 操作</h3>
        <div class="space-y-3">
          <div class="flex gap-2">
            <el-button type="primary" class="flex-1" @click="importJSON">
              <el-icon>
                <Download />
              </el-icon>
              导入 ROI
            </el-button>
            <el-button type="success" class="flex-1" @click="toJSON">
              <el-icon>
                <Upload />
              </el-icon>
              导出 ROI
            </el-button>
          </div>
          <div class="flex gap-2">
            <el-button type="danger" class="flex-1" @click="clearCanvas">
              <el-icon>
                <Delete />
              </el-icon>
              清除 ROI
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
                  {{ annotation.label }}
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
      <el-select v-model="labelInput" placeholder="请选择标签" style="width: 100%; margin-bottom: 15px;"
        v-show="showSelectInput">
        <el-option v-for="item in presetLabels" :key="item.value" :value="item.value">
        </el-option>
      </el-select>
      <div class="label-input-buttons">
        <button class="cancel-button" @click="clearLabel">取消</button>
        <button class="submit-button" @click="enterLabel">提交</button>
      </div>
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

  .label-input-buttons {
    display: flex;
    justify-content: space-between;
    /* Or 'space-around' or 'flex-end' depending on desired spacing */
    width: 100%;
    /* Make the button container take full width */
  }

  .label-input-buttons button {
    flex: 1;
    /* Make buttons share space equally */
    padding: 8px 15px;
    margin: 0 5px;
    /* Add some space between buttons */
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    text-align: center;

    &:hover {
      opacity: 0.9;
    }
  }

  .label-input-buttons button.cancel-button {
    background: #ff4d4f;
    color: white;

    &:hover {
      background: #ff7875;
    }
  }

  .label-input-buttons button.submit-button {
    background: #52c41a;
    color: white;

    &:hover {
      background: #73d13d;
    }
  }

  /* Remove margin from the first button if they are side-by-side */
  .label-input-buttons button:first-child {
    margin-left: 0;
  }

  /* Remove margin from the last button if they are side-by-side */
  .label-input-buttons button:last-child {
    margin-right: 0;
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
  flex: 1;
  /* Changed from width: 100% to allow proper flex sizing */
  min-width: 0;
  /* Added to prevent content from overflowing flex item */
}

#mark-box {
  flex: 1;
  overflow: hidden;
  margin-right: 15px;
  display: flex;
  justify-content: center;
}

.object-list {
  width: 100%;
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