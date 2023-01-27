import {StyleSheet, StatusBar} from 'react-native';
import React, {useRef, useState} from 'react';
import {useSharedValue} from 'react-native-reanimated';
import Content from './Content';
import Search from './Search';
import PullToAction from './PullToAction';
import SearchOverlay from './SearchOverlay';
import {Transition, Transitioning} from 'react-native-reanimated';

const marginTop = 32;
const CONTAINER_HEIGHT = 110;
const THRESHOLD = CONTAINER_HEIGHT + marginTop;

const transition = (
  <Transition.Together>
    <Transition.In type="scale" durationMs={400} />
    <Transition.Out type="scale" durationMs={400} />
  </Transition.Together>
);
const Things = () => {
  const translateY = useSharedValue(0);
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const showSearchBox = () => {
    if (!visible && ref.current) {
      ref.current.animateNextTransition();
      setVisible(true);
    }
  };
  const onRequestClose = () => {
    setVisible(false);
  };

  return (
    <Transitioning.View transition={transition} ref={ref} style={{flex: 1}}>
      <StatusBar translucent backgroundColor="transparent" />
      <Search translateY={translateY} />

      <PullToAction
        threshold={THRESHOLD}
        translateY={translateY}
        onPull={showSearchBox}>
        <Content />
      </PullToAction>

      <SearchOverlay IsVisible={visible} onRequestClose={onRequestClose} />
    </Transitioning.View>
  );
};

export default Things;

const styles = StyleSheet.create({});
