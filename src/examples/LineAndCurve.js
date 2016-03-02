import React, { Component } from 'react';
import { Surface, Shape, Group, Path, Text, Transform } from 'react-art';
import { line, curveBasis} from 'd3-shape';
import { scaleLinear } from 'd3-scale';

import { NICE, SUPER_NICE } from './colors';
import { Line } from '../shapes';
import mock from './mockData';

const styles = {
  line1: {
    stroke: NICE,
    strokeWidth: 1,
  },
  line2: {
    stroke: SUPER_NICE,
    strokeWidth: 3,
    strokeDash: [5],
  },
};

export default class LineAndCurve extends Component {
  render() {
    const width = 600, height = 500;
    const xScale = scaleLinear().domain([0, 100]).range([0, width]);
    const yScale = scaleLinear().domain([0, 100]).range([height, 0]);
    const { data, data2, accessors } = mock;
      
    return (
      <Surface width={width} height={height}>
        <Line style={styles.line1} data={data} curve={curveBasis}
          xScale={xScale} yScale={yScale} 
          xAccessor={accessors.x} yAccessor={accessors.y} />
        <Line style={styles.line2} data={data2}
          xScale={xScale} yScale={yScale}
          xAccessor={accessors.x} yAccessor={accessors.y} />
      </Surface>
    );
  }
}
