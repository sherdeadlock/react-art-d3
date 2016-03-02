import React, { Component } from 'react';
import { Group, Shape } from 'react-art';
import { pie, arc } from 'd3-shape';
import ArtPath from './ArtPath';

export default class Pie extends Component {
  render() {
    const { x, y, style, data, accessor, innerRadius, outerRadius } = this.props;
    const arcs = pie().value(accessor)(data);

    const a = arc().innerRadius(innerRadius || 0)
      .outerRadius(outerRadius);

    const shapes = arcs.map((arcData, i) => {
      const artPath = new ArtPath();
      console.log(arcData);
      a.context(artPath);
      a(arcData);
      const path = artPath.toART();
      return <Shape key={i} fill={style.fill} stroke={style.stroke}
        strokeWidth={style.strokeWidth} d={path} />;
    });

    return <Group x={x} y={y}>{shapes}</Group>;
  }
}
