import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useState, useImperativeHandle} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import MaskedView from '@react-native-masked-view/masked-view';

const {width} = Dimensions.get('window');
import {items} from './constants';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {clamp, snapPoint} from './utils';
const cursorHeight = 40;
const padding = 5;
const TabsHeader = React.forwardRef(({Vscroll}, ref) => {
  const offsetX = useSharedValue(0);
  const x = useSharedValue(0);
  const scrollOffset = useSharedValue(0);
  const cursorX = useSharedValue(0);
  const currentIndex = useSharedValue(0);

  const [measurements, setMeasurements] = useState(
    new Array(items.length).fill(0),
  );
  const [snapList, setSnapList] = useState(new Array(items.length).fill(0));

  const gesture = Gesture.Pan();

  gesture.onBegin(() => {
    offsetX.value = x.value;
    if (scrollOffset.value != 0) {
      x.value = withTiming(scrollOffset.value);
      offsetX.value = scrollOffset.value;
    }
  });
  gesture.onUpdate(e => {
    const newX = clamp(
      e.translationX + offsetX.value,
      snapList[snapList.length - 1],
      0,
    );
    const point = snapPoint(newX, snapList);
    const newIndex = snapList.indexOf(point);

    x.value = newX;

    cursorX.value = withTiming(point);
    currentIndex.value = newIndex;
    Vscroll.current.scrollTo(newIndex);
  });
  gesture.onEnd(() => {
    scrollOffset.value = 0;
    const point = snapPoint(x.value, snapList);
    x.value = withTiming(point);
    cursorX.value = withTiming(point);
    const newIndex = snapList.indexOf(point);
    currentIndex.value = newIndex;
    Vscroll.current.scrollTo(newIndex);
  });
  const rStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(measurements[Math.round(currentIndex.value)]),
      transform: [{translateX: -cursorX.value}],
    };
  });
  const scrollStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: x.value}],
    };
  });

  const scrollTo = i => {
    'worklet';
    const point = snapList[i];
    if (point != undefined) {
      const maxValue = width + Math.abs(x.value);
      const minValue = Math.abs(x.value);
      const endEdge = measurements[i] + Math.abs(point) + padding * 2;
      const startEdge = Math.abs(point);
      if (endEdge > maxValue) {
        const d = endEdge - maxValue;
        x.value = withTiming(x.value - d);
      } else if (startEdge < minValue) {
        const d = minValue - startEdge;

        x.value = withTiming(x.value + d);
      }
      scrollOffset.value = -startEdge;

      cursorX.value = withTiming(point);
      currentIndex.value = i;
    }
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        scrollTo,
      };
    },
    [snapList, measurements],
  );
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          {
            height: 50,

            justifyContent: 'center',
          },
          scrollStyle,
        ]}>
        <Animated.View
          collapsable
          style={[
            {
              height: cursorHeight,
              paddingHorizontal: padding,

              flexDirection: 'row',
            },
          ]}>
          {items.map((item, i) => {
            return (
              <View
                collapsable={false}
                onLayout={e => {
                  measurements[i] = e.nativeEvent.layout.width;
                  setMeasurements([...measurements]);
                  snapList[i] = -e.nativeEvent.layout.x;
                  setSnapList([...snapList]);
                }}
                key={i}
                style={{
                  height: '100%',

                  paddingHorizontal: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  {item.title}
                </Text>
              </View>
            );
          })}
        </Animated.View>

        <MaskedView
          style={{
            position: 'absolute',
            height: cursorHeight,
          }}
          androidRenderingMode="software"
          maskElement={
            <Animated.View
              style={[
                {
                  paddingHorizontal: padding,
                  flexDirection: 'row',

                  height: '100%',
                },
              ]}>
              <Animated.View
                style={[
                  rStyle,
                  {
                    height: cursorHeight,

                    borderRadius: 24,
                    backgroundColor: 'black',
                  },
                ]}></Animated.View>
            </Animated.View>
          }>
          <Animated.View
            style={[
              {
                flexDirection: 'row',
                backgroundColor: 'black',

                paddingHorizontal: padding * 2,

                height: '100%',
              },
            ]}>
            {items.map((item, i) => {
              return (
                <Pressable
                  onPress={() => {
                    scrollTo(i);
                    Vscroll.current.scrollTo(i);
                  }}
                  key={i}
                  style={{
                    height: '100%',
                    paddingHorizontal: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    {item.title}
                  </Text>
                </Pressable>
              );
            })}
          </Animated.View>
        </MaskedView>
      </Animated.View>
    </GestureDetector>
  );
});

export default TabsHeader;

const styles = StyleSheet.create({});
