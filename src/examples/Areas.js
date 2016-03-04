import React, { Component } from 'react';
import { Surface, Shape, Group, Path, Text, Transform } from 'react-art';
import { curveBasis} from 'd3-shape';
import { scaleLinear } from 'd3-scale';

import { NICE, SUPER_NICE } from './colors';
import { Area } from '../shapes';
import mock from './mockData';

const styles = {
  area1: {
    fill: 'rgba(133, 153, 0, 0.3)',
    // stroke: NICE,
    // strokeWidth: 1,
  },
  area2: {
    fill: 'rgba(211, 54, 130, 0.3)',
    stroke: SUPER_NICE,
    strokeWidth: 3,
    strokeDash: [5],
  },
};

function zero() {
  return 0;
}

export default class LineAndCurve extends Component {
  render() {
    const width = 600, height = 400;
    const xScale = scaleLinear().domain([0, 100]).range([0, width]);
    const yScale = scaleLinear().domain([0, 100]).range([height, 0]);
    const { data, data2, accessors } = mock;
      
    return (
      <Surface width={width} height={height}>
        <Area style={styles.area1} data={data}
          xScale={xScale} yScale={yScale} 
          xAccessor={accessors.x} y1Accessor={accessors.y}
          y0Accessor={zero}/>

        <Area style={styles.area2} data={data2} curve={curveBasis}
          xScale={xScale} yScale={yScale} 
          xAccessor={accessors.x} y1Accessor={accessors.y}
          y0Accessor={zero}/>
      </Surface>
    );
  }
}
