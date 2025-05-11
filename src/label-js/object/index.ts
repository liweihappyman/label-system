import MarkObject from './object'
import MarkRectObject from './rect'
import MarkPolygonObject from './polygon'
import MarkLineObject from './line'
import MarkCircleObject from './circle' // 新增导入

/** 绘制图形类型 */
enum MarkObjectType {
  /** 空 */
  NONE = '',
  /** 矩形 */
  RECT = 'rect',
  /** 多边形 */
  POLYGON = 'polygon',
  /** 直线 */
  LINE = 'line',
  /** 圆形 */
  CIRCLE = 'circle', // 新增圆形
}


// 单个导出
export { MarkObjectType, MarkObject, MarkRectObject, MarkPolygonObject, MarkLineObject, MarkCircleObject } // 新增导出