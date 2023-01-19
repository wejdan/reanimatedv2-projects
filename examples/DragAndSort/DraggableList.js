import {StyleSheet} from 'react-native';

import React from 'react';
import Animated, {
  scrollTo,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import Item from './Item';
const DraggableList = ({children, cols, itemHeight}) => {
  const scrollY = useSharedValue(0);
  const newPostion = useSharedValue(null);
  const movingItemPostion = useSharedValue(null);
  const scrollViewRef = useAnimatedRef();
  useAnimatedReaction(
    () => scrollY.value,

    scrolling => {
      scrollTo(scrollViewRef, 0, scrolling, false);
    },
  );

  const handleScroll = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });
  const contentHeight =
    ((children.length - 1) / cols) * itemHeight - itemHeight / 2;
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Animated.ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{
          height: (children.length / cols) * itemHeight,
        }}>
        {children.map((child, i) => {
          return (
            <Item
              cols={cols}
              scrollY={scrollY}
              contentHeight={contentHeight}
              key={i}
              index={i}
              scrollViewRef={scrollViewRef}
              newPostion={newPostion}
              itemHeight={itemHeight}
              movingItemPostion={movingItemPostion}>
              {child}
            </Item>
          );
        })}
      </Animated.ScrollView>
    </GestureHandlerRootView>
  );
};

export default DraggableList;

const styles = StyleSheet.create({});
