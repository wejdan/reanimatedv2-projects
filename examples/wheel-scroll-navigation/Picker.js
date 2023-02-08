import {StyleSheet, Dimensions, View} from 'react-native';
import React, {useContext} from 'react';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {Context} from './Context';
import {TOP, BOTTOM, BUTTON_SIZE, LEFT, RIGHT, CENTER} from './Buttons';
import {useNavigation} from '@react-navigation/native';
const {height, width} = Dimensions.get('window');
const SIZE = width * 0.8;
const CURSOR_WIDTH = SIZE;

const r = SIZE / 2;
function angle(ex, ey) {
  'worklet';

  var dy = ey - r;
  var dx = ex - r;
  var theta = Math.atan2(dy, dx); // range (-PI, PI]
  // console.log('theta', theta);
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta;
}

const snapPoint = (number, points) => {
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
const Picker = () => {
  const {currentMenu, a, playerRef, currentIndex, currentRoute} =
    useContext(Context);

  const navigation = useNavigation();

  const gesture = Gesture.Pan();
  const tapGesture = Gesture.Tap();
  const isButton = (x, y, button) => {
    return (
      x > button.x &&
      x < button.x + BUTTON_SIZE &&
      y > button.y &&
      y < button.y + BUTTON_SIZE
    );
  };
  tapGesture.onStart(e => {
    if (isButton(e.x, e.y, TOP)) {
      navigation.navigate('Menu');
    } else if (isButton(e.x, e.y, BOTTOM)) {
      if (currentRoute == 'Player') {
        playerRef.current.toggle();
      }
    } else if (isButton(e.x, e.y, LEFT)) {
      if (currentRoute == 'Player') {
        playerRef.current.prevTrack();
      }
    } else if (isButton(e.x, e.y, RIGHT)) {
      if (currentRoute == 'Player') {
        playerRef.current.nextTrack();
      }
    } else if (isButton(e.x, e.y, CENTER)) {
      const item = currentMenu[currentIndex.value];
      if (item.screen) {
        navigation.navigate(item.screen, item.params);
      }
    }
  });
  gesture.onUpdate(e => {
    a.value = angle(e.x, e.y);
  });
  gesture.onEnd(() => {
    const snapList = [];
    for (let index = 0; index < currentMenu.length; index++) {
      snapList.push(index * (360 / (currentMenu.length - 1)));
    }
    const point = snapPoint(a.value, snapList);
    a.value = withTiming(point);
  });

  const rnStyle = useAnimatedStyle(() => {
    return {
      borderRadius: CURSOR_WIDTH / 2,
    };
  });
  const composed = Gesture.Simultaneous(tapGesture, gesture);
  return (
    <GestureDetector gesture={composed}>
      <Animated.View
        style={[
          {
            position: 'absolute',
            width: CURSOR_WIDTH,
            height: CURSOR_WIDTH,
          },
          rnStyle,
        ]}></Animated.View>
    </GestureDetector>
  );
};

export default Picker;

const styles = StyleSheet.create({});
