import React, { Component } from 'react'
import { View } from '@tarojs/components'
import F2Canvas from '@/components/F2Canvas/F2Canvas'
import './index.scss'

import F2 from '@antv/f2';
export default class Index extends Component {
  onInit = (config) => {
    const data = [{
      time: '2016-08-08 00:00:05',
      value: 10,
      type: '预期收益率'
    }, {
      time: '2016-08-08 00:10:00',
      value: 22,
      type: '预期收益率'
    }, {
      time: '2016-08-08 00:30:00',
      value: 16,
      type: '预期收益率'
    }, {
      time: '2016-08-09 00:35:00',
      value: 26,
      type: '预期收益率'
    }, {
      time: '2016-08-09 01:00:00',
      value: 12,
      type: '预期收益率'
    }, {
      time: '2016-08-09 01:20:00',
      value: 26,
      type: '预期收益率'
    }, {
      time: '2016-08-10 01:40:00',
      value: 18,
      type: '预期收益率'
    }, {
      time: '2016-08-10 02:00:00',
      value: 26,
      type: '预期收益率'
    }, {
      time: '2016-08-10 02:20:00',
      value: 12,
      type: '预期收益率'
    }, {
      time: '2016-08-08 00:00:00',
      value: 4,
      type: '实际收益率'
    }, {
      time: '2016-08-08 00:10:00',
      value: 3,
      type: '实际收益率'
    }, {
      time: '2016-08-08 00:30:00',
      value: 6,
      type: '实际收益率'
    }, {
      time: '2016-08-09 00:35:00',
      value: -12,
      type: '实际收益率'
    }, {
      time: '2016-08-09 01:00:00',
      value: 1,
      type: '实际收益率'
    }, {
      time: '2016-08-09 01:20:00',
      value: 9,
      type: '实际收益率'
    }, {
      time: '2016-08-10 01:40:00',
      value: 13,
      type: '实际收益率'
    }, {
      time: '2016-08-10 02:00:00',
      value: -3,
      type: '实际收益率'
    }, {
      time: '2016-08-10 02:25:00',
      value: 11,
      type: '实际收益率'
    }];
    const chart = new F2.Chart(config);
    chart.source(data, {
      time: {
        type: 'timeCat',
        tickCount: 3,
        mask: 'hh:mm',
        range: [ 0, 1 ]
      },
      value: {
        tickCount: 3,
        formatter: function formatter(ivalue) {
          return ivalue + '%';
        }
      }
    });
    chart.axis('time', {
      line: null,
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
    chart.axis('tem', {
      grid: function grid(text) {
        if (text === '0%') {
          return {
            lineDash: null,
            lineWidth: 1
          };
        }
      }
    });
    chart.legend({
      position: 'bottom',
      offsetY: -5
    });
    chart.line()
      .position('time*value')
      .color('type')
      .shape('type', function(type) {
        if (type === '预期收益率') {
          return 'line';
        }
        if (type === '实际收益率') {
          return 'dash';
        }
      });

    chart.render();
    return chart
  }

  render () {
    return (
      <View className='index'>
        <F2Canvas
          style="width: 100%; height: 300px;"
          onInit={this.onInit.bind(this)}
        />
      </View>
    )
  }
}
