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

const tracks = data.albums
  .map(album => data.transformAlbumToPlaylist(album).entries)
  .flat();

const songsList = data.albums.map(album => {
  return {
    label: album.artist,
    screen: 'Player',
    thumbnail: album.picture.uri,
    params: {
      entries: tracks,
      selected: 0,
    },
  };
});
const items = songsList.flat().map((item, i) => {
  item.params.selected = i;
  return item;
});
const Songs = ({navigation}) => {
  const {setCurrentMenu, setCurrentRoute} = useContext(Context);
  useEffect(() => {
    setCurrentMenu(items);
    setCurrentRoute('Songs');
  }, [navigation]);
  return (
    <View>
      <List items={items} />
    </View>
  );
};

export default Songs;

const styles = StyleSheet.create({});
