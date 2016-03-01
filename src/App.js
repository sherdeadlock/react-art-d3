import React, { Component } from 'react';
import { Surface, Shape, Group, Path, Text, Transform } from 'react-art';
import { line, curveBasis} from 'd3-shape';
import { scaleLinear } from 'd3-scale';

import { NICE, SUPER_NICE } from './colors';
import ArtPath from './ArtPath';

class Line extends Component {
  render() {
    const { x, y, xScale, yScale, data, style, xAccessor, yAccessor, curve } = this.props;
    const stroke = style ? style.stroke : '#000000';
    const strokeWidth = style ? style.strokeWidth : 1;
    const strokeDash = style ? style.strokeDash : undefined;

    const artPath = new ArtPath();
    const l = line().x(d => xScale(xAccessor(d)))
      .y(d => yScale(yAccessor(d)))
      .context(artPath);

    if (curve) {
      l.curve(curve);
    }

    l(data);
    const path = artPath.toART();

    let transform;
    if (x || y) {
      transform = Transform(1, 0, 0, 1, x || 0, y || 0);
    }

    return <Shape
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeDash={strokeDash}
      transform={transform}
      d={path}
    />;
  }
}

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

const accessors = {
  x(d) {
    return d.x;
  },

  y(d) {
    return d.y
  },
}

export class App extends Component {
  render() {
    const width = 600, height = 500;
    const xScale = scaleLinear().domain([0, 100]).range([0, width]);
    const yScale = scaleLinear().domain([0, 100]).range([height, 0]);
    const data = [
      {x:10, y: 80}, {x: 20, y: 90}, {x: 30, y: 30}, {x: 40, y: 45},
      {x:50, y: 33}, {x: 60, y: 82}, {x: 70, y: 78}, {x: 80, y: 22},
    ];
    const data2 = [
      {x:10, y: 20}, {x: 20, y: 30}, {x: 30, y: 78}, {x: 40, y: 82},
      {x:50, y: 80}, {x: 60, y: 54}, {x: 70, y: 90}, {x: 80, y: 33},
    ];
      
    return (
      <Surface width={width} height={height}>
        <Line style={styles.line1} data={data} curve={curveBasis}
          xScale={xScale} yScale={yScale} 
          xAccessor={accessors.x} yAccessor={accessors.y} />
        <Line style={styles.line2} data={data2}
          xScale={xScale} yScale={yScale}
          xAccessor={accessors.x} yAccessor={accessors.y}
          />
      </Surface>
    );
  }
}
