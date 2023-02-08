import {StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import Animated, {
  interpolate as rInterpolate,
  useAnimatedStyle,
  useDerivedValue,
  interpolate,
} from 'react-native-reanimated';
import {Context} from './Context';
const ITEM_HEIGHT = 45;
const Cursor = () => {
  const {currentMenu, a} = useContext(Context);

  const translateY = useDerivedValue(() => {
    // return (a.value / 360) * ((currentMenu.length - 1) * ITEM_HEIGHT);
    return interpolate(
      a.value,
      [0, 360],
      [0, (currentMenu.length - 1) * ITEM_HEIGHT],
    );
  });

  const rnStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });
  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          left: 0,
          right: 0,
          height: ITEM_HEIGHT,
          backgroundColor: 'black',
        },
        rnStyle,
      ]}></Animated.View>
  );
};

export default Cursor;

const styles = StyleSheet.create({});
