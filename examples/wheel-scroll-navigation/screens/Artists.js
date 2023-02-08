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
import React, {useState, useContext, useEffect} from 'react';
import List from '../List';
import data from '../data';
import {Context} from '../Context';
const items = data.albums.map(album => {
  return {
    label: album.artist,
    screen: 'Player',
    thumbnail: album.picture.uri,
    params: {
      entries: data.transformAlbumToPlaylist(album).entries,
      selected: 0,
    },
  };
});
const Artists = ({navigation}) => {
  const {setCurrentMenu, setCurrentRoute} = useContext(Context);
  useEffect(() => {
    setCurrentMenu(items);
    setCurrentRoute('Artist');
  }, [navigation]);
  return (
    <View>
      <List items={items} />
    </View>
  );
};

export default Artists;

const styles = StyleSheet.create({});
