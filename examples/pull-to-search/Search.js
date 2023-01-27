import {View, StyleSheet} from 'react-native';

import React from 'react';
import Animated, {
  interpolate,
  Extrapolate,
  useAnimatedStyle,
  interpolateColor,
} from 'react-native-reanimated';

import Feather from 'react-native-vector-icons/Feather';
const grey = 'rgb(186, 187, 199)';
const primary = 'rgb(56, 132, 225)';
const size = 48;
const marginTop = 32;
const CONTAINER_HEIGHT = 110;
const THRESHOLD = CONTAINER_HEIGHT + marginTop;

const Search = ({translateY}) => {
  const oppositeOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [CONTAINER_HEIGHT, THRESHOLD],
      [0, 1],
      Extrapolate.CLAMP,
    );
    return {opacity};
  });

  const searchStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      translateY.value,
      [CONTAINER_HEIGHT, THRESHOLD],
      [grey, primary],
    );
    const y = Math.max(Math.min(translateY.value, THRESHOLD), 0);
    return {backgroundColor, transform: [{translateY: y}]};
  });

  const iconStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [CONTAINER_HEIGHT, THRESHOLD],
      [1, 0],
      Extrapolate.CLAMP,
    );
    return {opacity};
  });
  const chevronStyle = useAnimatedStyle(() => {
    return {transform: [{translateY: translateY.value}]};
  });
  return (
    <View
      style={[
        {
          position: 'absolute',
          left: 0,
          right: 0,
          marginTop,
          top: -CONTAINER_HEIGHT,
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}>
      <Animated.View
        style={[
          {
            width: size,
            height: size,
            borderRadius: size,
            alignItems: 'center',
            justifyContent: 'center',
          },
          searchStyle,
        ]}>
        <Feather name="search" size={32} color="white" />
      </Animated.View>

      <Animated.View style={chevronStyle}>
        <Animated.View style={iconStyle}>
          <Feather name="chevron-down" size={32} color="#babbc7" />
        </Animated.View>
        <Animated.View
          style={[
            {
              ...StyleSheet.absoluteFill,
              alignItems: 'center',
              justifyContent: 'center',
            },
            oppositeOpacity,
          ]}>
          <Feather name="chevron-down" size={32} color="#3f83ff" />
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
