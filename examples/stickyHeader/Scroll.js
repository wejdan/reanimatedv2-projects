import {StyleSheet, Dimensions} from 'react-native';
import React, {useImperativeHandle} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedReaction,
} from 'react-native-reanimated';

import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {clamp, snapPoint} from './utils';

const Scroll = React.forwardRef(
  ({otherScroll, children, scrollY, tabs, isHorzantal}, ref) => {
    const translate = useSharedValue(0);
    const offset = useSharedValue(0);

    const snapList = React.useMemo(() => {
      return Object.keys(tabs).map(k => {
        return tabs[k];
      });
    }, [tabs]);
    const cursorX = useSharedValue(0);
    const currentIndex = useSharedValue(0);
    if (!isHorzantal) {
      useAnimatedReaction(
        () => {
          return translate.value;
        },
        data => {
          scrollY.value = data;
        },
      ),
        [];
    }

    const gesture = Gesture.Pan();
    gesture.onBegin(() => {
      offset.value = translate.value;
    });
    gesture.onUpdate(e => {
      const delta = isHorzantal ? e.translationX : e.translationY;
      const newTranslate = clamp(
        delta + offset.value,
        snapList[snapList.length - 1],
        100,
      );
      translate.value = newTranslate;

      const point = snapPoint(newTranslate, snapList);
      const newIndex = snapList.indexOf(point);

      otherScroll.current.scrollTo(newIndex);
      if (isHorzantal) {
        cursorX.value = withTiming(point);
        currentIndex.value = newIndex;
      }
    });
    gesture.onEnd(() => {
      if (isHorzantal) {
        const snapList = Object.keys(tabs).map(k => {
          return tabs[k];
        });
        const point = snapPoint(translate.value, snapList);
        translate.value = withTiming(point);
        cursorX.value = withTiming(point);
        currentIndex.value = snapList.indexOf(point);
      }
    });

    const scrollTo = i => {
      const snapList = Object.keys(tabs).map(k => {
        return tabs[k];
      });

      const point = snapList[i];
      if (point == undefined) {
        return;
      }
      translate.value = withTiming(point);
      if (isHorzantal) {
        cursorX.value = withTiming(point);
        currentIndex.value = i;
      }
    };
    useImperativeHandle(
      ref,
      () => {
        return {
          scrollTo,
          translate,
        };
      },
      [tabs],
    );

    const scrollStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {translateX: isHorzantal ? translate.value : 0},
          {translateY: isHorzantal ? 0 : translate.value},
        ],
      };
    });

    return (
      <GestureDetector gesture={gesture}>
        <Animated.View style={scrollStyle}>{children}</Animated.View>
      </GestureDetector>
    );
  },
);

export default Scroll;

const styles = StyleSheet.create({});
