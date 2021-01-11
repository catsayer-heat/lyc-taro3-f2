---
title: lyc-taro3-f2
---

[toc!]

# Taro3 图表

目前支持微信小程序、支付宝小程序

实现方式主要依据：[wx-f2](https://github.com/antvis/wx-f2)
使用方式请参照：[antv-f2](https://f2.antv.vision/zh/docs/api/f2)

## 安装

yarn add lyc-taro3-f2 @antv/f2

> @antv/f2 需要手动安装

## 使用指南

在Taro文件中引入组件

````js

import F2Canvas from 'lyc-taro3-f2'
import F2 from '@antv/f2'

````

注意：渲染过后必须返回图表示例

````js 

const chart = new F2.Chart(config)
/*
  ...
  ···
  渲染
  ...
  ···
*/
chart.render()

return chart // 必须  required
`````

### 按需引入

按需引入部分参考 [antv-f2](https://f2.antv.vision/zh/docs/tutorial/require)

部分参考代码:
````js
import F2Canvas from 'lyc-taro3-f2' // required

const F2 = require('@antv/f2/lib/core'); // required

/*...引入你所需要用到图表...*/

require('@antv/f2/lib/geom/'); // 加载全部图形

require('@antv/f2/lib/geom/line'); // 只加载折线图
require('@antv/f2/lib/geom/area'); // 只加载面积图
require('@antv/f2/lib/geom/interval'); // 只加载柱状图
require('@antv/f2/lib/geom/path'); // 只加载路径图
require('@antv/f2/lib/geom/point'); // 只加载点图
require('@antv/f2/lib/geom/polygon'); // 只加载色块图
require('@antv/f2/lib/geom/schema'); // 只加载箱型图、股票图

````

### 示例

````js
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import F2Canvas from '@/components/F2Canvas/F2Canvas'
import './index.scss'

const F2 = require('@antv/f2/lib/core')
const Tooltip = require('@antv/f2/lib/plugin/tooltip');
F2.Chart.plugins.register(Tooltip);
require('@antv/f2/lib/geom/')

export default class Index extends Component {
  onInit = (config) => {
    const data = [{
      day: '周一',
      value: 300
    }, {
      day: '周二',
      value: 400
    }, {
      day: '周三',
      value: 350
    }, {
      day: '周四',
      value: 500
    }, {
      day: '周五',
      value: 490
    }, {
      day: '周六',
      value: 600
    }, {
      day: '周日',
      value: 900
    }];
    
    const chart = new F2.Chart(config);
    
    chart.source(data, {
      value: {
        tickCount: 5,
        min: 0
      },
      day: {
        range: [ 0, 1 ]
      }
    });
    chart.tooltip({
      showCrosshairs: true,
      showItemMarker: false,
      onShow: function onShow(ev) {
        const items = ev.items;
        items[0].name = null;
        items[0].value = '$ ' + items[0].value;
      }
    });
    chart.axis('day', {
      label: function label(_text, index, total) {
        const textCfg = { textAlign: 'center' };
        if (index === 0) {
          textCfg.textAlign = 'left';
        } else if (index === total - 1) {
          textCfg.textAlign = 'right';
        }
        return textCfg;
      }
    });
    chart.line().position('day*value');
    chart.point().position('day*value').style({
      stroke: '#fff',
      lineWidth: 1
    });
    chart.render()

    return chart // 必须返回 required
  }

  render () {
    return (
      <View className='index'>
        <F2Canvas
          className="my_canvas"
          onInit={this.onInit.bind(this)}
        />
      </View>
    )
  }
}

````

