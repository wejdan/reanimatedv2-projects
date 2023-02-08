import {StyleSheet, View} from 'react-native';
import React, {useContext} from 'react';
import Item from './Item';
import {Context} from './Context';
import {SCREEN_SIZE} from './IpodNavigation';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
const ITEM_HEIGHT = 45;

const List = ({items}) => {
  const {a} = useContext(Context);
  const translateY = useDerivedValue(() => {
    // return (a.value / 360) * ((currentMenu.length - 1) * ITEM_HEIGHT);
    return interpolate(
      a.value,
      [0, 360],
      [0, items.length * ITEM_HEIGHT],
      Extrapolate.CLAMP,
    );
  });
  const y = useSharedValue(0);
  const isInView = y => {
    'worklet';
    return y > 0 && y < SCREEN_SIZE;
  };
  const scrollTo = point => {
    'worklet';
    //  const inView = isInView(point);

    const lowerBound = SCREEN_SIZE + Math.abs(y.value) - ITEM_HEIGHT;
    const upperBound = Math.abs(y.value) + ITEM_HEIGHT;
    const maxScroll = SCREEN_SIZE - (items.length + 1) * ITEM_HEIGHT;

    const endEdge = ITEM_HEIGHT + point;
    const startEdge = point;
    if (endEdge > lowerBound) {
      const d = endEdge - lowerBound + 0;

      y.value = withTiming(Math.max(y.value - d, maxScroll), {duration: 120});
    } else if (startEdge < upperBound) {
      const d = upperBound - startEdge + 0;

      y.value = withTiming(Math.min(y.value + d, 0), {duration: 120});
    }
  };

  useAnimatedReaction(
    () => {
      return translateY.value;
    },
    data => {
      scrollTo(data);
    },
  );

  const scrollStyle = useAnimatedStyle(() => {
    return {
      flex: 1,
      transform: [{translateY: y.value}],
    };
  });
  return (
    <View style={{flex: 1}}>
      <Animated.View style={scrollStyle}>
        {items.map((item, i) => {
          const active = useDerivedValue(() => {
            // return (a.value / 360) * ((currentMenu.length - 1) * ITEM_HEIGHT);
            const isActive =
              translateY.value >= ITEM_HEIGHT * i &&
              translateY.value <= ITEM_HEIGHT * (i + 1);

            return isActive;
          });
          return (
            <Item
              active={active}
              key={i}
              onPress={n => n.navigate(item.screen, item.params)}
              {...item}
            />
          );
        })}
      </Animated.View>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({});
