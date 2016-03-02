import React, { Component } from 'react';
import { Shape, Transform } from 'react-art';
import { line, curveBasis } from 'd3-shape';
import ArtPath from '../ArtPath';

export default class Line extends Component {
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
