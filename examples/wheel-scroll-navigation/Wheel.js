import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  Text,
} from 'react-native';
import React, {useContext} from 'react';
import Animated from 'react-native-reanimated';

import Picker from './Picker';
import {useNavigation} from '@react-navigation/native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Context} from './Context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {State, usePlaybackState} from 'react-native-track-player';
const {height: wheight, width} = Dimensions.get('window');
const height = wheight - StatusBar.currentHeight;
const SIZE = width * 0.8;
const INNER_SIZE = SIZE * 0.39;
const CURSOR_WIDTH = 80;

const r = SIZE / 2 - CURSOR_WIDTH / 2;

const Wheel = () => {
  const {currentMenu, a, playerRef, currentRoute, currentIndex} =
    useContext(Context);

  const playbackState = usePlaybackState();

  return (
    <Animated.View
      style={{
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE / 2,
        backgroundColor: '#353335',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          width: INNER_SIZE,
          height: INNER_SIZE,
          borderRadius: INNER_SIZE / 2,
          backgroundColor: 'black',
        }}
      />
      <View style={{...StyleSheet.absoluteFill}}>
        <Picker currentIndex={currentIndex} a={a} currentMenu={currentMenu} />
      </View>
      <View
        pointerEvents="none"
        style={{
          ...StyleSheet.absoluteFill,
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 12,
        }}>
        <Text style={{color: 'white'}}>MENU</Text>

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <MaterialCommunityIcons
            onPress={() => {
              if (currentRoute == 'Player') {
                playerRef.current.prevTrack();
              }
            }}
            name="skip-backward"
            color="white"
            size={24}
          />
          <MaterialCommunityIcons name="skip-forward" color="white" size={24} />
        </View>
        <View>
          {playbackState == 8 || playbackState == State.Connecting ? (
            <View style={styles.button}>
              <ActivityIndicator size="large" color="white" />
            </View>
          ) : (
            <Ionicons
              style={{marginLeft: 5}}
              name={playbackState == State.Playing ? 'pause' : 'play'}
              color="white"
              size={30}
            />
          )}
        </View>
      </View>
    </Animated.View>
  );
};

export default Wheel;

const styles = StyleSheet.create({});
