import {Dimensions} from 'react-native';

const {height: wheight, width} = Dimensions.get('window');
const SIZE = width * 0.8;
export const BUTTON_SIZE = SIZE / 3;
export const TOP = {
  x: BUTTON_SIZE,
  y: 0,
};
export const BOTTOM = {
  x: BUTTON_SIZE,
  y: BUTTON_SIZE * 2,
};
export const LEFT = {
  x: 0,
  y: BUTTON_SIZE,
};
export const CENTER = {
  x: BUTTON_SIZE,
  y: BUTTON_SIZE,
};
export const RIGHT = {
  x: BUTTON_SIZE * 2,
  y: BUTTON_SIZE,
};
