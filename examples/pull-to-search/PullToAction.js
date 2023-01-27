import {StyleSheet, Dimensions} from 'react-native';
import React, {useRef} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDecay,
  withTiming,
} from 'react-native-reanimated';
import {useHeaderHeight} from '@react-navigation/elements';

import {Gesture, GestureDetector} from 'react-native-gesture-handler';

const {height, width} = Dimensions.get('window');
const friction = ratio => {
  'worklet';
  return 0.67 * Math.pow(1 - ratio, 2);
};
const clamp = (value, min, max) => {
  'worlet';
  return Math.max(Math.min(value, max), min);
};
const PullToAction = ({children, onPull, translateY, threshold}) => {
  const offsetY = useSharedValue(0);
  const headerHeight = useHeaderHeight();
  const contentHeight = useRef(null);

  const gesture = Gesture.Pan();
  gesture.onBegin(() => {
    offsetY.value = translateY.value;
  });
  gesture.onUpdate(e => {
    const maxScroll = -(contentHeight.current + headerHeight) + height;
    const postion = e.translationY + offsetY.value;
    const isInBound = postion < 0 && postion > maxScroll;
    const ovrallScroll = postion > 0 ? postion : postion - maxScroll; //how much you moved aoutside the boundreies

    if (isInBound) {
      translateY.value = postion;
    } else {
      translateY.value =
        e.translationY *
          friction(
            Math.min(Math.abs(ovrallScroll) / contentHeight.current, 1),
          ) +
        offsetY.value;
    }
  });
  gesture.onEnd(e => {
    const maxScroll = -(contentHeight.current + headerHeight) + height;

    if (translateY.value >= threshold) {
      onPull();

      translateY.value = withSpring(0);
    } else if (translateY.value > 0) {
      translateY.value = withSpring(0);
    } else if (translateY.value < maxScroll) {
      translateY.value = withSpring(maxScroll);
    } else {
      translateY.value = withDecay({
        velocity: e.velocityY,
        clamp: [maxScroll, 0],
      });
    }
  });

  const scrollStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        collapsable={false}
        onLayout={e => {
          contentHeight.current = e.nativeEvent.layout.height; //2-detect the height of the content
        }}
        style={scrollStyle}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
};

export default PullToAction;

const styles = StyleSheet.create({});
