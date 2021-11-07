import React from 'react'
import Taro from '@tarojs/taro'
import { Canvas } from '@tarojs/components'

import { my as F2Context } from '@antv/f2-context'
import F2 from '@antv/f2'

interface InitParams {
  context: CanvasRenderingContext2D
  width: number
  height: number
  pixelRatio?: number
}
interface PropsParams {
  id: string
  className: string
  style: string
  onInit: (params: InitParams) => F2.Chart
}

function wrapEvent(e) {
  if (!e) return
  if (!e.preventDefault) {
    e.preventDefault = function() {}
  }
  return e
}

function randomStr (long) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const maxPos = chars.length
  var string = ''
  for (var i = 0; i < long; i++) {
    string += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return string
}

export default class F2Canvas extends React.Component<PropsParams> {
  static defaultProps = {
    id: 'f2-canvas-' + randomStr(16),
    className: '',
    style: '',
    onInit: () => {}
  }

  canvasEl: HTMLElement
  chart: F2.Chart

  componentWillMount() {
    setTimeout(() => {
      switch(process.env.TARO_ENV) {
        case 'alipay':
          this.onAlipayCanvas()
          break
        case 'weapp':
        case 'qywx':
          this.onWxCanvas()
          break;
        default:
          console.error('暂未支持该平台')
      }
    }, 100)
  }

  // alipay canvas
  onAlipayCanvas() {
    const ctx = Taro.createCanvasContext(this.props.id)
    const context = F2Context(ctx)

    const query = Taro.createSelectorQuery()
    query.select('#' + this.props.id)
      .boundingClientRect()
      .exec(res => {
        // 获取画布实际宽高
        const { width, height } = res[0]
        if (!width || !height) return

        const config = { context, width, height }
        const chart = this.props.onInit(config)
        if (chart) {
          this.chart = chart
          this.canvasEl = chart.get('el')
        }
      })
  }

  // wx canvas
  onWxCanvas() {
    const query = Taro.createSelectorQuery()

    query.select('#' + this.props.id)
      .fields({
        node: true,
        size: true
      }).exec(res => {
        let { node, width, height } = res[0]
        const context = node.getContext('2d')
        const pixelRatio = Taro.getSystemInfoSync().pixelRatio
        // 高清设置
        node.width = width * pixelRatio
        node.height = height * pixelRatio

        const config = { context, width, height, pixelRatio }
        const chart = this.props.onInit(config)
        if (chart) {
          this.chart = chart
          this.canvasEl = chart.get('el')
        }
      })
  }

  touchStart(e){
    const canvasEl = this.canvasEl
    if (canvasEl) {
      canvasEl.dispatchEvent(wrapEvent(e))
    }
  }
  touchMove(e){
    const canvasEl = this.canvasEl
    if (canvasEl) {
      canvasEl.dispatchEvent(wrapEvent(e))
    }
  }
  touchEnd(e){
    const canvasEl = this.canvasEl
    if (canvasEl) {
      canvasEl.dispatchEvent(wrapEvent(e))
    }
  }

  render() {
    return (
      <Canvas
        className={this.props.className}
        style={this.props.style}
        type="2d"
        id={this.props.id}
        onTouchStart={this.touchStart.bind(this)}
        onTouchMove={this.touchMove.bind(this)}
        onTouchEnd={this.touchEnd.bind(this)}
      />
    )
  }
}
