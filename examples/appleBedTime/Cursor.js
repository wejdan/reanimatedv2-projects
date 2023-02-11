import {Text, StyleSheet, Dimensions, Pressable} from 'react-native';
import React from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {r, CURSOR_WIDTH} from './constants';
import {cartesianToPolar, degrees_to_radians, updateAngle} from './utils';
const radius = r - CURSOR_WIDTH / 2;
const Cursor = ({angle, isPM}) => {
  const translateX = useDerivedValue(() => {
    return radius + radius * Math.sin(degrees_to_radians(angle.value));
  });
  const translateY = useDerivedValue(() => {
    return radius - radius * Math.cos(degrees_to_radians(angle.value));
  });

  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  const gesture = Gesture.Pan();
  gesture.onBegin(() => {
    offsetX.value = translateX.value;
    offsetY.value = translateY.value;
  });
  gesture.onUpdate(e => {
    const fingerX = e.translationX + offsetX.value;
    const fingerY = e.translationY + offsetY.value;
    const currentA = cartesianToPolar(fingerX, fingerY, radius);

    updateAngle(currentA, angle, isPM);
  });
  const rnStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      width: CURSOR_WIDTH,
      height: CURSOR_WIDTH,
      borderRadius: CURSOR_WIDTH / 2,
      backgroundColor: '#fd9f0c',
      transform: [
        {
          translateX: translateX.value,
        },
        {translateY: translateY.value},
      ],
    };
  });
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={rnStyle}></Animated.View>
    </GestureDetector>
  );
};

export default Cursor;

const styles = StyleSheet.create({});
