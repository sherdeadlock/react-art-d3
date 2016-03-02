const data = [
  {x:10, y: 80}, {x: 20, y: 90}, {x: 30, y: 30}, {x: 40, y: 45},
  {x:50, y: 33}, {x: 60, y: 82}, {x: 70, y: 78}, {x: 80, y: 22},
];

const data2 = [
  {x:10, y: 20}, {x: 20, y: 30}, {x: 30, y: 78}, {x: 40, y: 82},
  {x:50, y: 80}, {x: 60, y: 54}, {x: 70, y: 90}, {x: 80, y: 33},
];

const accessors = {
  x(d) {
    return d.x;
  },

  y(d) {
    return d.y
  },
};

export default {
  data,
  data2,
  accessors,
}
