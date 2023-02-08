import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  useSharedValue,
  interpolate as rInterpolate,
  Extrapolate,
  useAnimatedStyle,
  runOnJS,
  interpolateColor,
  useAnimatedReaction,
  withTiming,
  useDerivedValue,
} from 'react-native-reanimated';
import React, {useState, useEffect, useContext} from 'react';
import List from '../List';
import {Context} from '../Context';

const items = [
  {label: 'Playlists', icon: 'list', screen: 'Playlists'},
  {label: 'Albums', icon: 'layers', screen: 'Albums'},
  {label: 'Artists', icon: 'users', screen: 'Artists'},
  {label: 'Songs', icon: 'music', screen: 'Songs'},
  {label: 'Shuffles', icon: 'shuffle', screen: 'Shuffle'},
  {
    label: 'Settings',
    icon: 'settings',
    screen: 'Settings',
  },
];
const Menu = ({navigation}) => {
  const {setCurrentMenu, setCurrentRoute} = useContext(Context);
  useEffect(() => {
    setCurrentMenu(items);
    setCurrentRoute('Menu');
  }, [navigation]);
  return (
    <View>
      <List items={items} />
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({});
