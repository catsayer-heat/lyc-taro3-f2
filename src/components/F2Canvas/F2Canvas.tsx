import React from 'react'
import Taro, { eventCenter, getCurrentInstance } from '@tarojs/taro'
import { View, Canvas } from '@tarojs/components'

type propsParams = {
  id: string
  className: string
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
    onInit: () => {}
  }

  $instance = getCurrentInstance()
  canvasEl: any
  chart: any

  componentWillMount() {
    setTimeout(() => {
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
    }, 100)
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
      <View className={this.props.className}>
        <Canvas
          style="width: 100%; height: 100%"
          type="2d"
          id={this.props.id}
          onTouchStart={this.touchStart.bind(this)}
          onTouchMove={this.touchMove.bind(this)}
          onTouchEnd={this.touchEnd.bind(this)}
        />
      </View>
    )
  }
}