import {Text, StyleSheet, Dimensions, StatusBar, Image} from 'react-native';

import React, {useRef} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

const {height: wheight, width} = Dimensions.get('window');
const height = wheight - StatusBar.currentHeight;

const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = height / 1.8;
const MARGIN = 10;
const Item = ({item, onPress, selectedItem, scrollref, index}) => {
  const ref = useRef(null);
  const gesture = Gesture.LongPress();
  gesture.minDuration(200);
  const scale = useSharedValue(1);

  gesture.onBegin(() => {
    scale.value = withTiming(0.9);
  });

  gesture.onTouchesUp(() => {
    scale.value = withDelay(200, withTiming(1));
  });
  gesture.onTouchesCancelled(() => {
    scale.value = withDelay(200, withTiming(1));
  });

  gesture.onEnd(() => {
    scale.value = withTiming(1);

    onPress(ref, item, index);
  });
  const rnStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  return (
    <Animated.View
      style={[
        {
          marginVertical: MARGIN,
          opacity: selectedItem?.item.id == item.id ? 0 : 1,
        },
      ]}
      ref={ref}
      collapsable={false}>
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            {
              elevation: 5,
              width: CARD_WIDTH,
              height: CARD_HEIGHT,
              borderRadius: 15,
              //  overflow: 'hidden',
              padding: 20,
              justifyContent: 'space-between',
            },
            rnStyle,
          ]}>
          <Image
            source={{uri: item.url}}
            style={{...StyleSheet.absoluteFill, borderRadius: 15}}
          />
          <Text style={{fontWeight: 'bold', fontSize: 30, color: 'white'}}>
            {item.name}
          </Text>
          <Text style={{color: 'white'}}>Subtitle</Text>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
};

export default Item;

const styles = StyleSheet.create({});
