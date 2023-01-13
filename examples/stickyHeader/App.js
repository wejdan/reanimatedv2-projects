import {View, StyleSheet, Dimensions, StatusBar} from 'react-native';

import React, {useEffect, useRef, useState} from 'react';
import Animated, {
  useSharedValue,
  interpolate,
  Extrapolate,
  useDerivedValue,
  withTiming,
  useAnimatedRef,
} from 'react-native-reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Background from './Background';
import Content from './Content';
import StickyHeader from './StickyHeader';
import {
  HEADER_MAX_HEIGHT,
  HEADER_MIN_HEIGHT,
  HEADER_SCROLL_DISTANCE,
  items,
} from './constants';

const App = () => {
  const scrollY = useSharedValue(0);
  const headerHeight = useDerivedValue(() => {
    return interpolate(
      scrollY.value,
      [HEADER_SCROLL_DISTANCE, 0, 100],
      [HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, HEADER_MAX_HEIGHT + 100],
      Extrapolate.CLAMP,
    );
  });
  const Hscroll = useRef();
  const Vscroll = useRef();
  const defaultTabs = items.map((item, i) => {
    return;
  });
  const [tabs, setTabs] = useState(defaultTabs);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Background headerHeight={headerHeight} scrollY={scrollY} />
      <Content
        headerHeight={headerHeight}
        scrollY={scrollY}
        Hscroll={Hscroll}
        thisScroll={Vscroll}
        tabs={tabs}
        onMesaure={(index, tab) => {
          tabs[index] = tab;
          setTabs({...tabs});
        }}
      />

      <StickyHeader
        tabs={tabs}
        Vscroll={Vscroll}
        headerHeight={headerHeight}
        scrollY={scrollY}
        thisRef={Hscroll}
      />
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({});
