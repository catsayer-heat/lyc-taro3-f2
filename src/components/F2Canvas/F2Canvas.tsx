import React from 'react'
import Taro from '@tarojs/taro'
import { Canvas } from '@tarojs/components'

import { my as F2Context } from '@antv/f2-context'

type propsParams = {
  id: string
  className: string
  style: string
  onInit: any
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

export default class F2Canvas extends React.Component<propsParams> {
  static defaultProps = {
    id: 'f2-canvas-' + randomStr(16),
    className: '',
    style: '',
    onInit: () => {}
  }

  canvasEl: any
  chart: any

  componentWillMount() {
    setTimeout(() => {
      if (process.env.TARO_ENV === 'alipay') {
        this.onAlipayCanvas()
      } else if (process.env.TARO_ENV === 'weapp') {
        this.onWxCanvas()
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

  // weapp canvas
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
      canvasEl.dispatchEvent('touchstart', wrapEvent(e))
    }
  }
  touchMove(e){
    const canvasEl = this.canvasEl
    if (canvasEl) {
      canvasEl.dispatchEvent('touchmove', wrapEvent(e))
    }
  }
  touchEnd(e){
    const canvasEl = this.canvasEl
    if (canvasEl) {
      canvasEl.dispatchEvent('touchend', wrapEvent(e))
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