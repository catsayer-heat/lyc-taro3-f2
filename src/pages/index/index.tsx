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
    chart.render();
    return chart
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
