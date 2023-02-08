import {StyleSheet, Dimensions, View} from 'react-native';
import React, {useContext} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
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

const Picker = () => {
  const {a, playerRef, currentRoute, command} = useContext(Context);

  const navigation = useNavigation();
  const gesture = Gesture.Pan();
  const tapGesture = Gesture.Tap();

  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const isInRegion = (x, y, region) => {
    return (
      x > region.x &&
      x < region.x + BUTTON_SIZE &&
      y > region.y &&
      y < region.y + BUTTON_SIZE
    );
  };
  tapGesture.onStart(e => {
    if (isInRegion(e.x, e.y, TOP)) {
      navigation.navigate('Menu');
    } else if (isInRegion(e.x, e.y, BOTTOM)) {
      if (currentRoute == 'Player') {
        playerRef.current.toggle();
      }
    } else if (isInRegion(e.x, e.y, LEFT)) {
      if (currentRoute == 'Player') {
        playerRef.current.prevTrack();
      }
    } else if (isInRegion(e.x, e.y, RIGHT)) {
      if (currentRoute == 'Player') {
        playerRef.current.nextTrack();
      }
    } else if (isInRegion(e.x, e.y, CENTER)) {
      command.value = 'CENTER';
      // const item = currentMenu[currentIndex.value];
      // if (item.screen) {
      //   console.log(item.screen, item.params);
      //   navigation.navigate(item.screen, item.params);
      // }
    }
  });
  gesture.onBegin(e => {
    x.value = e.x;
    y.value = e.y;
  });
  gesture.onUpdate(e => {
    const currentA = angle(e.x, e.y); //angle at this frame
    const prevAngle = angle(x.value, y.value); //the angle at the prev frem
    x.value = e.x;
    y.value = e.y;

    const tmpAngle = (a.value + (currentA - prevAngle)) % 360;
    if (tmpAngle >= 0) {
      a.value = tmpAngle;
    } else {
      a.value = 360 + tmpAngle;
    }
  });
  gesture.onEnd(() => {
    // const snapList = [];
    // for (let index = 0; index < currentMenu.length; index++) {
    //   snapList.push(index * (360 / (currentMenu.length - 1)));
    // }
    // const point = snapPoint(a.value, snapList);
    // a.value = withTiming(point);
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
