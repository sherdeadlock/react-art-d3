import React, { Component } from 'react';
import { Shape, Transform } from 'react-art';
import { area } from 'd3-shape';
import ArtPath from './ArtPath';

export default class Area extends Component {
  render() {
    const { style, xScale, yScale, data, 
      xAccessor, y0Accessor, y1Accessor, curve,
    } = this.props;

    const artPath = new ArtPath();
    const a =  area().context(artPath)
      .x(d => xScale(xAccessor(d)))
      .y1(d => yScale(y1Accessor(d)))
      .y0(d => yScale(y0Accessor(d)));

    if (curve) {
      a.curve(curve);
    }

    a(data);
    const path = artPath.toART();

    return <Shape d={path} 
      fill={style.fill}
      stroke={style.stroke} 
      strokeWidth={style.strokeWidth}
      strokeDash={style.strokeDash} />;
  }
}
