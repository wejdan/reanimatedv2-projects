import {StyleSheet, Dimensions, Text, View} from 'react-native';
import React from 'react';
export const {height, width} = Dimensions.get('window');

const color1 = '#fcfed5';
const color2 = '#648840';
const blocks = Array(8)
  .fill()
  .map((v, i) => i);

export const SIZE = width / 8;
export const WIDTH = width;
export const HEIGHT = SIZE * 8;
const Background = () => {
  return (
    <View
      style={{
        ...StyleSheet.absoluteFill,
        backgroundColor: 'white',
        width: WIDTH,
        height: HEIGHT,
      }}>
      {blocks.map((_, j) => {
        return (
          <View key={j} style={{flexDirection: 'row', width: WIDTH}}>
            {blocks.map((_, i) => {
              return (
                <View
                  key={i + j}
                  style={{
                    width: SIZE,
                    height: SIZE,
                    backgroundColor: (i + j) % 2 == 0 ? color1 : color2,
                  }}
                />
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

export default Background;

const styles = StyleSheet.create({});
