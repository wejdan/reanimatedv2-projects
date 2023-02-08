import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {Image} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';
import {Context} from './Context';

const ITEM_HEIGHT = 45;

const Item = ({
  icon,
  thumbnail,
  label,
  index,
  command,
  active,
  dark,
  onPress,
  navigate,
}) => {
  const {currentIndex, setActiveItem, isPicking, setCurrentOnPress} =
    useContext(Context);

  return (
    <Animated.View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          height: ITEM_HEIGHT,
          alignItems: 'center',
          backgroundColor: dark && '#2c7fbc',
        },
      ]}>
      {icon && (
        <Feather name={icon} size={24} color={dark ? 'white' : 'black'} />
      )}
      {thumbnail && (
        <Image
          source={{uri: thumbnail}}
          style={{
            width: ITEM_HEIGHT,
            height: ITEM_HEIGHT,
            marginHorizontal: 16,
          }}
        />
      )}
      <Text
        style={{
          marginHorizontal: 16,
          fontSize: 16,
          color: dark ? 'white' : 'black',
        }}>
        {label}
      </Text>
    </Animated.View>
  );
};

export default Item;

const styles = StyleSheet.create({});
