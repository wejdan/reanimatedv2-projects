import {View, StyleSheet, Dimensions, StatusBar, Text} from 'react-native';
import React, {useEffect, useContext, useState} from 'react';
import Animated, {
  useSharedValue,
  interpolate as rInterpolate,
  useAnimatedStyle,
  useAnimatedReaction,
  withTiming,
} from 'react-native-reanimated';
import MaskedView from '@react-native-masked-view/masked-view';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Cursor from './Cursor';
import Item from './Item';
import {Context} from './Context';

const {height: wheight, width} = Dimensions.get('window');
const height = wheight - StatusBar.currentHeight;
const SCREEN_SIZE = width - 32;

const ITEM_HEIGHT = 45;

const List = React.forwardRef(({items}, ref) => {
  const {currentIndex, currentMenu} = useContext(Context);
  const y = useSharedValue(0);
  useEffect(() => {
    y.value = 0;
  }, [currentMenu]);
  const [containerHeight, setContainerHeight] = useState(SCREEN_SIZE);
  const scrollStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: y.value}],
    };
  });
  const scrollTo = i => {
    'worklet';
    const point = i * ITEM_HEIGHT;
    const lowerBound = containerHeight + Math.abs(y.value);
    const upperBound = Math.abs(y.value);
    const maxScroll = containerHeight - currentMenu.length * ITEM_HEIGHT;

    const endEdge = ITEM_HEIGHT + point;
    const startEdge = point;
    if (endEdge > lowerBound) {
      const d = endEdge - lowerBound + ITEM_HEIGHT / 2;

      y.value = withTiming(Math.max(y.value - d, maxScroll - ITEM_HEIGHT / 2));
    } else if (startEdge < upperBound) {
      const d = upperBound - startEdge + ITEM_HEIGHT / 2;

      y.value = withTiming(Math.min(y.value + d, 0));
    }
  };
  useAnimatedReaction(
    () => {
      return currentIndex.value;
    },
    data => {
      // data holds what was returned from the first worklet's execution
      scrollTo(data);
    },
  );

  return (
    <View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: 'white',
          paddingTop: 10,
          zIndex: 10,
        }}>
        <Text style={{color: 'black', fontWeight: 'bold'}}>19:08</Text>
      </View>
      <View style={{position: 'absolute', top: 10, right: 10, zIndex: 10}}>
        <FontAwesome name="battery-2" size={18} color="#21cf72" />
      </View>
      <Animated.View
        onLayout={e => {
          setContainerHeight(SCREEN_SIZE - e.nativeEvent.layout.y);
        }}
        style={[scrollStyle]}>
        {items.map((item, i) => {
          const navigate = {
            screen: item.screen,
            params: item.params,
          };
          return <Item key={i} index={i} navigate={navigate} {...item} />;
        })}
        <MaskedView
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
          }}
          androidRenderingMode="software"
          maskElement={<Cursor />}>
          {items.map((item, i) => {
            return (
              <Item
                dark={true}
                key={i}
                onPress={n => n.navigate(item.screen, item.params)}
                {...item}
              />
            );
          })}
        </MaskedView>
      </Animated.View>
    </View>
  );
});

export default List;

const styles = StyleSheet.create({});
