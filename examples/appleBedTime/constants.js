import {Dimensions, StatusBar} from 'react-native';

export const {height: wheight, width} = Dimensions.get('window');
export const height = wheight - StatusBar.currentHeight;
export const SIZE = width * 0.8;
export const CURSOR_WIDTH = 50;

export const r = SIZE / 2;
