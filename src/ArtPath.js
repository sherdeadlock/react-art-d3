import { Path } from 'react-art';

var pi = Math.PI,
    tau = 2 * pi,
    epsilon = 1e-6,
    tauEpsilon = tau - epsilon;

export default class ArtPath {
  constructor() {
    this._path = Path();
  }

  moveTo(x, y) {
    this._path.moveTo(x, y);
  }

  lineTo(x, y) {
    this._path.lineTo(x, y);
  }

  bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x, y) {
    this._path.curveTo(cpx1, cpy1, cpx2, cpy2, x, y);
  }

  quadraticCurveTo(cpx, cpy, x, y) {
    this._path.curveTo(cpx, cpy, x, y);
  }

  closePath() {
    this._path.close();
  }

  rect(x, y, w, h) {
    this._path.moveTo(x, y).line(w, 0)
      .line(0, h).lineTo(-w, 0).close();
  }

  arcTo(x1, y1, x2, y2, r) {
    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
    var x0 = this.penDownX,
        y0 = this.penDownY,
        x21 = x2 - x1,
        y21 = y2 - y1,
        x01 = x0 - x1,
        y01 = y0 - y1,
        l01_2 = x01 * x01 + y01 * y01;

    // Is the radius negative? Error.
    if (r < 0) throw new Error("negative radius: " + r);


    // Is this path empty? Move to (x1,y1).
    if (this._path.penDownX === null) {
      this._path.moveTo(x1, y1);
    }

    // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
    else if (!(l01_2 > epsilon));

    // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
    // Equivalently, is (x1,y1) coincident with (x2,y2)?
    // Or, is the radius zero? Line to (x1,y1).
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
      this._path.lineTo(x1, y1);
    }

    // Otherwise, draw an arc!
    else {
      var x20 = x2 - x0,
          y20 = y2 - y0,
          l21_2 = x21 * x21 + y21 * y21,
          l20_2 = x20 * x20 + y20 * y20,
          l21 = Math.sqrt(l21_2),
          l01 = Math.sqrt(l01_2),
          l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
          t01 = l / l01,
          t21 = l / l21;

      // If the start tangent is not coincident with (x0,y0), line to.
      if (Math.abs(t01 - 1) > epsilon) {
        this._path.lineTo(x1 + t01 * x01, y1 + t01 * y01);
      }

      this._path.artTo(
        x1 + t21 * x21, y1 + t21 * y21, r, r, 0, !+(y01 * x20 > x01 * y20), 0);
    }
  }

  //arc(x, y, radius, startAngle, endAngle, anticlockwise) {
  arc(x, y, r, a0, a1, ccw) {
    x = +x, y = +y, r = +r;
    var dx = r * Math.cos(a0),
        dy = r * Math.sin(a0),
        x0 = x + dx,
        y0 = y + dy,
        cw = 1 ^ ccw,
        da = ccw ? a0 - a1 : a1 - a0;

    // Is the radius negative? Error.
    if (r < 0) throw new Error("negative radius: " + r);

    // Is this path empty? Move to (x0,y0).
    if (this._path.penDownX === null) {
      this._path.moveTo(x0, y0);
    }

    // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
    else if (Math.abs(this._path.penDownX - x0) > epsilon || Math.abs(this._path.penDownY - y0) > epsilon) {
      this._path.lineTo(x0, y0);
    }

    // Is this arc empty? We’re done.
    if (!r) return;

    // Is this a complete circle? Draw two arcs to complete the circle.
    if (da > tauEpsilon) {
      this._path.arcTo(x - dx, y - dy, r, r, 1, !cw, 0);
      this._path.arcTo(x0, y0, r, r, 1, !cw, 0);
    }

    // Otherwise, draw an arc!
    else {
      if (da < 0) da = da % tau + tau;
      this._path.arcTo(x + r * Math.cos(a1), y + r * Math.sin(a1), r, r, +(da >= pi), !cw, 0);
    }
  }

  toART() {
    return this._path;
  }
}
