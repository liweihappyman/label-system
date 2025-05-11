import { Ellipse, Group, IPointData, Path, Rect, Text } from 'leafer-ui'
import { genUUID } from '../utils/uuid'
import MarkCanvas from '..'
import MarkObject from './object'
import { MarkObjectType, MarkRectObject, MarkPolygonObject } from '.'

/**
 * 标注对象 LINE
 */
export default class MarkLineObject extends MarkObject {
  // 最后按下
  lastPointDown?: IPointData
  constructor(box: MarkCanvas) {
    super()
    // 生成随机ID
    this.id = genUUID()
    // 设置最小点位数量
    this.minPointCount = 2

    // 标注类型
    this.type = MarkObjectType.LINE

    // 设置父级容器
    this.box = box
    this.index = box.markObjectList.length + 1

    // 创建分组
    this.obj = new Group({ x: 0, y: 0 })

    // 添加到画布
    this.box.objectsLayer.add(this.obj)

    // 盒子事件
    this.boxEventIds = [
      this.box.app.on_('onzoom', this.boxOnZoom, this), // 缩放监听
      this.box.app.on_('onTranslate', this.boxOnTranslate, this), // 平移监听
      this.box.app.on_('onpointleave', this.boxOnPointLeave, this), // 离开画布
      this.box.app.on_('onpointmove', this.boxOnPointMove, this), // 鼠标移动
      this.box.app.on_('onpointdown', this.boxOnPointDown, this), // 鼠标按下
      this.box.app.on_('onpointup', this.boxOnPointUp, this) // 鼠标松开
    ]
  }
  /** 鼠标按下 */
  async boxOnPointDown(e: IPointData) {
    if (this.status == 'draw') { // 绘制中
      this.lastPointDown = e
      this.pointList = [e, e]
      this.render()
    }

    // 鼠标在标注内部点击
    if (this.mouseEnter && (this.status == 'done' || this.status == 'edit')) {
      if (this.box.selectObject && this.box.selectObject.id !== this.id) {
        this.box.selectObject.status = 'done'
        this.box.selectObject.render()
        this.box.selectObject = undefined
      }
      this.status != 'edit' && this.box.app.emit('onchange')
      this.status = 'edit'
      this.box.selectObject = this
      this.mouseDown = true
      this.lastMousePoint = this.box.lastPoint!
      // 判断当前点位距离哪一个点最近
      this.acctivePointIndex = this.getMinDistance(this.lastMousePoint)

      this.render()
    } else if (this.status == 'edit') { // 标注外部点击 取消选中状态
      this.status = 'done'
      this.box.selectObject = undefined
      this.render()
      this.box.app.emit('onchange')
    }
  }
  /**
   * 获取鼠标距离那个点最近
   * @param oPoint 
   * @returns 
   */
  getMinDistance(oPoint: IPointData) {
    let minDistance = Infinity
    let minDistanceIndex = -1
    this.pointList.forEach((point, index) => {
      let distance = Math.sqrt(Math.pow(point.x - oPoint.x, 2) + Math.pow(point.y - oPoint.y, 2))
      if (distance < minDistance) {
        minDistance = distance
        minDistanceIndex = index
      }
    })
    let expand = 8 / this.box.curLayout.zoom
    if (minDistance < expand) return minDistanceIndex
    return -1
  }
  /** 鼠标移动 */
  boxOnPointMove() {
    if (this.completeing == true) return
    if (this.status == 'draw' && this.pointList[0]) {
      this.pointList[1] = this.box.lastPoint!
      this.render()
    }

    if (this.mouseDown && this.status == 'edit') {
      // 偏移量
      let offset = {
        x: this.box.lastPoint!.x - this.lastMousePoint!.x,
        y: this.box.lastPoint!.y - this.lastMousePoint!.y
      }

      if (this.acctivePointIndex == -1) {
        // 更新点位
        this.pointList = this.pointList.map(point => {
          return {
            x: point.x + offset.x,
            y: point.y + offset.y
          }
        })
      } else {
        // 更新选中的点位
        this.pointList[this.acctivePointIndex] = { ...this.box.lastPoint! }
      }

      // 更新最后鼠标位置
      this.lastMousePoint = this.box.lastPoint!
    } else if (this.status == 'edit') {
      this.acctivePointIndex = this.getMinDistance(this.box.lastPoint!)
    }
    this.render()
  }
  /** 鼠标松开 */
  boxOnPointUp() {
    this.mouseDown = false
    if (this.status == 'draw') {
      if (this.pointList.length === 2) {
        this.complete()
      }
    }
  }
  /** 离开画布 */
  boxOnPointLeave() {
    this.mouseDown = false
    this.acctivePointIndex = -1
    this.render()
  }
  /** 缩放 */
  boxOnZoom() {
    this.render()
  }
  /** 平移 */
  boxOnTranslate() {
    this.render()
  }
  /** 销毁 */
  destory() {
    // 取消事件监听
    this.box.app.off_(this.boxEventIds)
    this.obj.off_(this.objoxEventIds)

    // 清空画布
    for (let i = 0; i < this.obj.children.length; i++) this.obj.remove(this.obj.children[i])
    this.obj.children = []

    // 删除画布元素
    this.box.objectsLayer.remove(this.obj)

    // 销毁元素
    // this.obj.destroy()
    this.box.app.emit('onchange')
  }
  /** 完成 */
  async complete() {
    // 点位数量不足
    if (this.pointList.length < this.minPointCount) return

    // 判断两个点位相差超过最小距离
    let offset = Math.sqrt(
      Math.pow(this.pointList[0].x - this.pointList[1].x, 2) + 
      Math.pow(this.pointList[0].y - this.pointList[1].y, 2)
    )
    if (offset < 30) {
      this.status = 'draw'
      this.pointList = []
      this.render()
      return
    }

    // 发送通知获取前端进程的标签数据
    this.completeing = true
    let labelData = await new Promise((resolve, reject) => {
      this.box.app.emit('oncomplete', { ok: resolve, err: reject })
    }).catch(() => {
      this.completeing = false
      this.pointList = []
      this.render()
      throw Error('The mark object has not been assigned a label.')
    }) as ObjectLabelData

    // 设置标签
    this.completeing = false
    this.label = labelData.label
    this.color = labelData.color

    this.status = 'done'
    this.render()

    let obj = null
    if (this.box.currentDrawingType == MarkObjectType.RECT) {
      obj = new MarkRectObject(this.box)
    } else if (this.box.currentDrawingType == MarkObjectType.POLYGON) {
      obj = new MarkPolygonObject(this.box)
    } else if (this.box.currentDrawingType == MarkObjectType.LINE) {
      obj = new MarkLineObject(this.box)
    }
    obj && this.box.markObjectList.push(obj)
    this.box.app.emit('onchange')
  }
  /** 渲染 */
  render() {
    // 清空画布
    for (let i = 0; i < this.obj.children.length; i++) this.obj.remove(this.obj.children[i])
    this.obj.children = []

    if (this.pointList.length < 2) return // 如果点不足，不渲染
    // 重置定位
    this.obj.x = 0, this.obj.y = 0

    // 缩放比例
    let zoom = this.box.curLayout.zoom

    // 绘制一个序号
    if (this.pointList.length == 2) {
      let point = this.pointList[0] || this.box.lastPoint
      // 绘制一个方块
      let _box = new Rect({
        x: point.x,
        y: point.y - 20 / zoom,
        width: 30 / zoom,
        height: 20 / zoom,
        fill: "rgba(0,0,0,0.6)",
      })
      this.obj.add(_box)

      // 绘制文本
      let _text = new Text({
        width: 30 / zoom,
        height: 20 / zoom,
        x: point.x,
        y: point.y - 20 / zoom,
        fill: '#fff',
        textAlign: 'center',
        verticalAlign: 'middle',
        text: this.index.toString(),
        fontSize: 12 / zoom,
      })
      this.obj.add(_text)
    }

    // 线宽
    let lineW = this.box.config.lineWidth / zoom
    
    // 如果有两个点，绘制直线
    if (this.pointList.length === 2) {
      // 绘制直线
      let line = new Path({
        path: `M${this.pointList[0].x},${this.pointList[0].y} L${this.pointList[1].x},${this.pointList[1].y}`,
        stroke: this.color,
        strokeWidth: lineW
      })
      this.obj.add(line)

      // 绘制端点
      if (this.status === 'edit' || this.status === 'draw') {
        this.pointList.forEach((point, index) => {
          let _vertex = new Ellipse({
            x: point.x - lineW * 2,
            y: point.y - lineW * 2,
            width: lineW * 4,
            height: lineW * 4,
            fill: this.color
          })
          this.obj.add(_vertex)

          // 高亮选中的点
          if (this.acctivePointIndex === index) {
            let _highlightVertex = new Ellipse({
              x: point.x - lineW * 4,
              y: point.y - lineW * 4,
              width: lineW * 8,
              height: lineW * 8,
              fill: this.color
            })
            this.obj.add(_highlightVertex)
          }
        })
      }
    }
  }
  /** 判断点是否在直线附近 */
  isPointInside(point: IPointData): boolean {
    if (this.pointList.length !== 2) return false
    
    // 计算点到线段的距离
    const distanceToLine = (p: IPointData, v: IPointData, w: IPointData) => {
      // 线段长度的平方
      const l2 = Math.pow(v.x - w.x, 2) + Math.pow(v.y - w.y, 2)
      if (l2 === 0) return Math.sqrt(Math.pow(p.x - v.x, 2) + Math.pow(p.y - v.y, 2))
      
      // t是点p在线段上的投影点的参数值（0-1之间表示在线段上）
      let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2
      t = Math.max(0, Math.min(1, t))
      
      // 计算投影点坐标
      const projX = v.x + t * (w.x - v.x)
      const projY = v.y + t * (w.y - v.y)
      
      // 返回点到投影点的距离
      return Math.sqrt(Math.pow(p.x - projX, 2) + Math.pow(p.y - projY, 2))
    }
    
    // 计算点到线段的距离
    const distance = distanceToLine(point, this.pointList[0], this.pointList[1])
    
    // 判断距离是否在阈值内
    let expand = 8 / this.box.curLayout.zoom
    return distance < expand
  }
  /** 导出数据 */
  export(): MarkObjectJSON {
    return {
      index: this.index,
      type: this.type,
      label: this.label,
      color: this.color,
      pointList: this.pointList,
    }
  }
  /** 导入 */
  static import(box: MarkCanvas, data: MarkObjectJSON): MarkLineObject {
    let obj = new this(box)
    obj.label = data.label
    obj.color = data.color
    obj.pointList = data.pointList
    obj.status = 'done'
    obj.render()

    return obj
  }
}