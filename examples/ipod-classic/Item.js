import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {Image} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {Context} from './Context';
import {useOnPress} from './Buttons';

const ITEM_HEIGHT = 45;

const Item = ({icon, thumbnail, label, active, onPress}) => {
  const {command} = useContext(Context);
  const rnStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: active.value ? '#2c7fbc' : 'white',
    };
  });
  const textStyle = useAnimatedStyle(() => {
    return {
      color: active.value ? 'white' : 'black',
    };
  });

  const iconLight = useAnimatedStyle(() => {
    return {
      opacity: active.value ? 0 : 1,
    };
  });
  const iconDark = useAnimatedStyle(() => {
    return {
      opacity: active.value ? 1 : 0,
    };
  });
  useOnPress(command, 'CENTER', active, onPress);

  return (
    <Animated.View
      style={[
        rnStyle,
        {
          flexDirection: 'row',
          alignItems: 'center',
          height: ITEM_HEIGHT,
          alignItems: 'center',
        },
      ]}>
      {icon && (
        <View>
          <Animated.View style={iconLight}>
            <Feather name={icon} size={24} color={'black'} />
          </Animated.View>
          <Animated.View style={[iconDark, {...StyleSheet.absoluteFill}]}>
            <Feather name={icon} size={24} color={'white'} />
          </Animated.View>
        </View>
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
      <Animated.Text
        style={[
          {
            marginHorizontal: 16,
            fontSize: 16,
          },
          textStyle,
        ]}>
        {label}
      </Animated.Text>
    </Animated.View>
  );
};

export default Item;

const styles = StyleSheet.create({});
