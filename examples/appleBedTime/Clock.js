import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SIZE, r} from './constants';
import {degrees_to_radians} from './utils';
const strokes = Array(40)
  .fill()
  .map((v, i) => i);
const singleAngle = 360 / strokes.length;
const strokeHeight = 25;
const strokeWidth = 2;

const clockRaduis = r - strokeHeight;
const Clock = () => {
  return (
    <View
      style={{
        // position: 'absolute',
        width: clockRaduis,
        height: clockRaduis,
        borderRadius: clockRaduis / 2,
        backgroundColor: 'red',
        //  opacity: 0.3,
      }}>
      {strokes.map((stroke, i) => {
        const x =
          r + clockRaduis * Math.sin(degrees_to_radians(singleAngle * i));
        const y =
          r - clockRaduis * Math.cos(degrees_to_radians(singleAngle * i));
        return (
          <View
            style={{
              position: 'absolute',
              width: 2,
              height: strokeHeight,
              backgroundColor: 'white',
              top: y - strokeHeight / 2,
              left: x - strokeWidth / 2,
              transform: [{rotateZ: `${singleAngle * i}deg`}],
            }}
            key={i}
          />
        );
      })}
    </View>
  );
};

export default Clock;

const styles = StyleSheet.create({});
