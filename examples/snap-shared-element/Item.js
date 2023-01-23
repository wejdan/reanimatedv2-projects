import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Image,
  Pressable,
} from 'react-native';

import React, {useRef} from 'react';

const {width} = Dimensions.get('window');

const CARD_WIDTH = width / 2;
const CARD_HEIGHT = 300;
const PADDING = 10;

const Item = ({story, getInfo, selectedItem}) => {
  const _ref = useRef();
  const opacity =
    selectedItem != null ? (story.id == selectedItem.story.id ? 0 : 1) : 1;
  return (
    <View
      collapsable={false}
      ref={_ref}
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        padding: PADDING,
        opacity,
      }}>
      <Pressable
        onPress={() => {
          getInfo(_ref, story);
        }}>
        <Image source={{uri: story.thumbnail}} style={styles.img} />
      </Pressable>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  img: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
  },
});
