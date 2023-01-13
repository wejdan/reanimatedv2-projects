export const measureObj = async ref => {
  return new Promise(r => {
    ref.measure((x0, y0, w, h, px, py) => r({x: px, y: py, h: h, w: w}));
  });
};

export const clamp = (value, min, max) => {
  'worlet';
  return Math.max(Math.min(value, max), min);
};
export const snapPoint = (number, points) => {
  'worklet';
  const deltas = points.map(p => {
    return Math.abs(number - p);
  });
  const min = Math.min.apply(0, deltas);
  const point = points.filter(p => {
    return Math.abs(number - p) == min;
  });
  return point[0];
};
