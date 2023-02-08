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
import React, {
  useState,
  useContext,
  useEffect,
  useImperativeHandle,
} from 'react';
import {navigationRef} from '../RootNavigation';

import List from '../List';
import data from '../data';
import {Context} from '../Context';

const items = data.playlists.map(playlist => {
  return {
    label: playlist.name,
    screen: 'Player',
    thumbnail: playlist.entries[0].album.picture.uri,
    params: {
      entries: playlist.entries,
      selected: 0,
    },
  };
});

const Playlists = ({navigation}) => {
  const {setCurrentMenu, setCurrentRoute} = useContext(Context);
  useEffect(() => {
    setCurrentMenu(items);
    setCurrentRoute('Playlist');
  }, [navigation]);

  return (
    <View>
      <List items={items} />
    </View>
  );
};

export default Playlists;

const styles = StyleSheet.create({});
