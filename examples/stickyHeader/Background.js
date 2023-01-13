import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import React from 'react';
import Animated, {
  interpolate,
  Extrapolate,
  useAnimatedStyle,
  interpolateColor,
} from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';

const {width} = Dimensions.get('window');
import {HEADER_SCROLL_DISTANCE} from './constants';
const Background = ({headerHeight, scrollY}) => {
  const rnStyle = useAnimatedStyle(() => {
    const y = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [0, -300],
      Extrapolate.CLAMP,
    );
    const elevation = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [0, 3],
      Extrapolate.CLAMP,
    );
    return {
      elevation,
      height: headerHeight.value,
    };
  });
  const imgStyle = useAnimatedStyle(() => {
    const y = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [0, -300],
      Extrapolate.CLAMP,
    );
    const opacity = interpolate(
      scrollY.value,
      [HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      [1, 0],
      Extrapolate.CLAMP,
    );
    const height = interpolate(
      scrollY.value,
      [0, 100],
      [300, 400],
      Extrapolate.CLAMP,
    );
    return {
      height,
      opacity,
      transform: [{translateY: y}],
    };
  });
  const contentStyle = useAnimatedStyle(() => {
    const y = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [0, -292],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{translateY: y}],
    };
  });
  const text1Style = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE / 2],
      [1, 0],
      Extrapolate.CLAMP,
    );
    return {
      opacity,
    };
  });
  const iconsStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE / 3],
      [1, 0],
      Extrapolate.CLAMP,
    );
    const color = interpolateColor(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE / 3],
      ['white', 'black'],
    );
    return {
      //  opacity,
      color,
    };
  });
  const text2Style = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      [1, 0],
      Extrapolate.CLAMP,
    );
    const x = interpolate(
      scrollY.value,
      [HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      [0, -50],
      Extrapolate.CLAMP,
    );
    return {
      opacity,
      transform: [{translateX: x}],
    };
  });
  const titleStyle = useAnimatedStyle(() => {
    const x = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [0, 35],
      Extrapolate.CLAMP,
    );
    const y = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [0, -4],
      Extrapolate.CLAMP,
    );
    return {
      transform: [{translateX: x}, {translateY: y}],
    };
  });
  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          borderBottomColor: '#ccc',
          borderBottomWidth: 1,
          overflow: 'hidden',
          backgroundColor: 'white',
        },
        rnStyle,
      ]}>
      <Animated.Image
        style={[{width, height: 300}, imgStyle]}
        source={{
          uri: 'https://recipes.timesofindia.com/thumb/53096885.cms?width=1200&height=900',
        }}
      />
      <Animated.View
        style={[
          {
            position: 'absolute',
            flexDirection: 'row',
            width,
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            paddingVertical: 28,
          },
          iconsStyle,
        ]}>
        <Animated.Text style={iconsStyle}>
          <AntDesign name="arrowleft" size={25} />
        </Animated.Text>
        <AntDesign name="heart" color="white" size={25} />
      </Animated.View>
      <Animated.View
        style={[{paddingHorizontal: 10, paddingVertical: 20}, contentStyle]}>
        <Animated.Text
          style={[
            {
              fontWeight: 'bold',
              fontSize: 24,
              color: 'black',
            },
            titleStyle,
          ]}>
          Chocolate Cake Recipe
        </Animated.Text>
        <Animated.Text
          style={[
            {
              marginVertical: 10,
            },
            text2Style,
          ]}>
          StickyHeader
        </Animated.Text>
        <Animated.View
          style={[
            {
              flexDirection: 'row',
              width: width * 0.6,
              justifyContent: 'space-between',
            },
            text1Style,
          ]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AntDesign name="clockcircleo" size={15} />
            <Text> 30-40 min</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text> 4.3</Text>
            <AntDesign name="star" size={15} />
            <Text> (156)</Text>
          </View>

          <Text>150SR</Text>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

export default Background;

const styles = StyleSheet.create({});
