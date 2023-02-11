import {useSharedValue} from 'react-native-reanimated';

export function degrees_to_radians(degrees) {
  'worklet';
  var pi = Math.PI;
  return degrees * (pi / 180);
}

export function cartesianToPolar(ex, ey, r) {
  'worklet';

  var dy = r - ey;
  var dx = ex - r;
  var theta = Math.atan2(dx, dy); // range (-PI, PI]
  // console.log('theta', theta);
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta;
}
export function polarToCartesian(r, a) {
  'worklet';

  const x = r + r * Math.sin(degrees_to_radians(a));
  const y = r - r * Math.cos(degrees_to_radians(a));
  return {x, y};
}

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
export const updateAngle = (newAngle, angle, isPM) => {
  let currenRev;
  const d = isPM.value
    ? Math.abs(newAngle + 360 - angle.value)
    : Math.abs(newAngle - angle.value);
  if (d > 90) {
    currenRev = !isPM.value;
    isPM.value = currenRev;
  } else {
    currenRev = isPM.value;
  }

  if (currenRev) {
    angle.value = newAngle + 360;
  } else {
    angle.value = newAngle;
  }
};
export const calcluteNewAngle = (angle, d) => {
  let newAngle = (angle.value + d) % 360;

  if (newAngle < 0) {
    newAngle = 360 + newAngle;
  }
  return newAngle;
};
