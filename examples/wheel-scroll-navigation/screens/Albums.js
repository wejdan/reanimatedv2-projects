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
import data from '../data';
import {Context} from '../Context';
const items = data.albums.map(album => {
  return {
    label: album.name,
    screen: 'Player',
    thumbnail: album.picture.uri,
    params: {
      entries: data.transformAlbumToPlaylist(album).entries,
      selected: 0,
    },
  };
});
const Albums = ({navigation}) => {
  const {setCurrentMenu, setCurrentRoute} = useContext(Context);
  useEffect(() => {
    setCurrentMenu(items);
    setCurrentRoute('Albums');
  }, [navigation]);
  return (
    <View>
      <List items={items} />
    </View>
  );
};

export default Albums;

const styles = StyleSheet.create({});
