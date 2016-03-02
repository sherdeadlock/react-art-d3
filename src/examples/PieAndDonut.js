import React, { Component } from 'react';
import { Surface, Shape, Group, Path, Text, Transform } from 'react-art';
import { line, curveBasis} from 'd3-shape';

import { NICE, SUPER_NICE } from './colors';
import { Pie } from '../shapes';
import mock from './mockData';

const styles = {
  pie: {
    // fill: NICE,
    stroke: NICE,
    strokeWidth: 1,
  },
  donut: {
    stroke: SUPER_NICE,
    strokeWidth: 3,
  },
};

export default class PieAndDonut extends Component {
  render() {
    const width = 300, height = 300;
    const { data, accessors } = mock;
      
    return (
      <Surface width={width} height={height}>
        <Pie x={width/2} y={height/2} style={styles.pie} 
          accessor={accessors.x}
          outerRadius={100} data={data} />
      </Surface>
    );
  }
}
