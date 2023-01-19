import {StyleSheet} from 'react-native';

import React from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedReaction,
  runOnUI,
  withSpring,
  cancelAnimation,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {Dimensions, StatusBar} from 'react-native';

const {height: wheight, width} = Dimensions.get('window');
const height = wheight - StatusBar.currentHeight;
const DEFAULT_ANIMATION_CONFIG = {
  damping: 20,
  mass: 0.2,
  stiffness: 100,
  overshootClamping: false,
  restSpeedThreshold: 0.2,
  restDisplacementThreshold: 0.2,
};

const clamp = (value, min, max) => {
  'worklet';
  return Math.max(Math.min(value, max), min);
};

const Item = ({
  index,
  children,
  contentHeight,
  scrollY,
  movingItemPostion,
  newPostion,
  itemHeight,
  cols,
}) => {
  const isDragging = useSharedValue(false);
  const itemWidth = width / cols;
  const x = useSharedValue((index * itemWidth) % width);
  const y = useSharedValue(Math.floor(index / cols) * itemHeight);
  const offsetY = useSharedValue(0);
  const offsetX = useSharedValue(0);
  const gesture = Gesture.Pan();
  const isOnEdge = useSharedValue(false);
  const longPressGesture = Gesture.LongPress();

  const isMoving = useSharedValue(false);

  longPressGesture.onStart(() => {
    isDragging.value = true;
  });
  longPressGesture.minDuration(250);
  gesture.manualActivation(true);
  gesture.onTouchesMove((_e, state) => {
    if (isDragging.value) {
      runOnUI(state.activate)();
    } else {
      runOnUI(state.fail)();
    }
  });
  gesture.onFinalize(() => {
    isDragging.value = false;
  });
  gesture.onBegin(() => {
    offsetY.value = y.value;
    offsetX.value = x.value;

    isMoving.value = true;
    movingItemPostion.value = {x: x.value, y: y.value};
  });

  gesture.onUpdate(e => {
    const newX = clamp(e.translationX + offsetX.value, 0, width);
    const newY = clamp(e.translationY + offsetY.value, 0, contentHeight);
    x.value = newX;
    y.value = newY;
    const x1 = Math.abs(Math.round(newX / itemWidth) * itemWidth);
    const y1 = Math.abs(Math.round(newY / itemHeight) * itemHeight);
    newPostion.value = {x: x1, y: y1};

    const upperEdge = scrollY.value;
    const lowerEdge = scrollY.value + height;

    if (newY - itemHeight < upperEdge) {
      scrollY.value = withTiming(0);
    } else if (newY + itemHeight > lowerEdge) {
      scrollY.value = withTiming(contentHeight);
    } else {
      cancelAnimation(scrollY);
    }
  });
  gesture.onFinalize(() => {
    isMoving.value = false;
  });
  gesture.onEnd(e => {
    x.value = withSpring(newPostion.value.x, DEFAULT_ANIMATION_CONFIG);
    y.value = withSpring(newPostion.value.y, DEFAULT_ANIMATION_CONFIG);
    isMoving.value = false;

    //  onClose();
  });
  gesture.simultaneousWithExternalGesture(longPressGesture);
  const composedGesture = Gesture.Race(gesture, longPressGesture);
  useAnimatedReaction(
    () => {
      return newPostion.value;
    },
    data => {
      if (movingItemPostion.value != null && data != null) {
        if (data.x == x.value && data.y == y.value) {
          const newX = movingItemPostion.value.x;
          const newY = movingItemPostion.value.y;
          if (data.x != newX || data.y != newY) {
            x.value = withSpring(newX, DEFAULT_ANIMATION_CONFIG);
            y.value = withSpring(newY, DEFAULT_ANIMATION_CONFIG);
            movingItemPostion.value = {x: data.x, y: data.y};
          }
        }
      }
    },
    [],
  );

  const rnStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      width: itemWidth,
      height: itemHeight,
      justifyContent: 'center',
      alignItems: 'center',

      zIndex: isMoving.value ? 10 : withTiming(0),
      elevation: isMoving.value ? 5 : 0,
      transform: [
        {translateX: x.value},
        {translateY: y.value},
        {scale: isMoving.value ? withTiming(1.3) : withTiming(1)},
      ],
    };
  });
  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View style={rnStyle}>{children}</Animated.View>
    </GestureDetector>
  );
};

export default Item;

const styles = StyleSheet.create({});
