import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';

const {width} = Dimensions.get('window');
import {HEADER_MIN_HEIGHT, HEADER_SCROLL_DISTANCE} from './constants';

import TabsHeader from './TabsHeader';

const StickyHeader = ({scrollY, Vscroll, thisRef}) => {
  const rnStyle = useAnimatedStyle(() => {
    return {
      opacity: scrollY.value <= HEADER_SCROLL_DISTANCE ? withTiming(1) : 0,
      elevation: 3,
    };
  });

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          flex: 1,
          overflow: 'hidden',
          backgroundColor: 'white',
          height: HEADER_MIN_HEIGHT,

          width,
        },
        rnStyle,
      ]}>
      <View style={[{flexDirection: 'row', flex: 2, paddingHorizontal: 10}]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AntDesign name="arrowleft" color="black" size={25} />
          <Text
            style={{
              marginLeft: 10,
              fontWeight: 'bold',
              fontSize: 24,
              color: 'black',
            }}>
            Chocolate Cake Recipe
          </Text>
        </View>
      </View>
      <TabsHeader Vscroll={Vscroll} ref={thisRef} />
    </Animated.View>
  );
};

export default StickyHeader;

const styles = StyleSheet.create({});
