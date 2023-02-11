import {View, StyleSheet, Dimensions} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedProps,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import arc from './AnimatedHelper';
const {height, width} = Dimensions.get('window');
import Svg, {Circle, Defs, LinearGradient, Path, Stop} from 'react-native-svg';
import {SIZE, r, CURSOR_WIDTH} from './constants';
import {cartesianToPolar} from './utils';
import MaskedView from '@react-native-masked-view/masked-view';
import {degrees_to_radians, calcluteNewAngle, updateAngle} from './utils';
const strokes = Array(40)
  .fill()
  .map((v, i) => i);
const AnimatedPath = Animated.createAnimatedComponent(Path);

const cx = SIZE / 2;
const cy = SIZE / 2;

const raduis = r - CURSOR_WIDTH / 2;

const singleAngle = 360 / strokes.length;
const strokeHeight = 25;
const strokeWidth = 2;

const clockRaduis = r - strokeHeight;
const Progress = ({endAngle, startAngle, isBedTimePM, isWakeupPM}) => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);

  const gesture = Gesture.Pan();

  gesture.onBegin(e => {
    x.value = e.x;
    y.value = e.y;
  });
  gesture.onUpdate(e => {
    const currentA = cartesianToPolar(e.x, e.y, r); //angle at this frame

    const prevAngle = cartesianToPolar(x.value, y.value, r); //the angle at the prev frem

    x.value = e.x;
    y.value = e.y;
    const delta = currentA - prevAngle;
    let sAngle = calcluteNewAngle(startAngle, delta);
    updateAngle(sAngle, startAngle, isBedTimePM);

    let eAngle = calcluteNewAngle(endAngle, delta);

    updateAngle(eAngle, endAngle, isWakeupPM);
  });
  const animatedProps = useAnimatedProps(() => {
    const d = arc({
      x: cx,
      y: cy,
      R: raduis,
      r: raduis,
      start: startAngle.value,
      end: endAngle.value,
    });
    return {
      d: d,
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View>
        <Svg style={{transform: [{rotate: '0deg'}]}} width={SIZE} height={SIZE}>
          <Circle
            cx={cx}
            cy={cy}
            r={raduis}
            strokeWidth={CURSOR_WIDTH}
            stroke="#1e1b20"
          />

          <AnimatedPath
            //    d={d}
            stroke="#b17313"
            strokeWidth={CURSOR_WIDTH}
            animatedProps={animatedProps}
          />
        </Svg>

        <MaskedView
          style={{
            position: 'absolute',
          }}
          androidRenderingMode="software"
          maskElement={
            <Svg
              style={{transform: [{rotate: '0deg'}]}}
              width={SIZE}
              height={SIZE}>
              <AnimatedPath
                //    d={d}
                stroke="black"
                strokeWidth={CURSOR_WIDTH}
                animatedProps={animatedProps}
              />
            </Svg>
          }>
          <View
            style={{
              width: SIZE,
              height: SIZE,
              borderRadius: SIZE / 2,
              opacity: 0.3,
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
        </MaskedView>
      </Animated.View>
    </GestureDetector>
  );
};

export default Progress;

const styles = StyleSheet.create({});
