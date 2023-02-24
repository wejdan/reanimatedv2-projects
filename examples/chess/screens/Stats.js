import {StyleSheet, Text, Image, View, Pressable} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {SIZE, width} from '../components/Background';
import {Context} from '../Context';
import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
const Stat = ({navigation, route}) => {
  const {turn, init, board, active} = useContext(Context);
  /* 2. Get the param */
  const {winner} = route.params;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}>
      <View
        style={{
          width: width * 0.8,
          // height: SIZE * 2.5,
          backgroundColor: '#f8f8f8',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 15,
          padding: 10,
          paddingVertical: 30,
          // flexDirection: 'row',
        }}>
        <Text style={{fontSize: 30, fontWeight: 'bold', marginBottom: 20}}>
          {winner.charAt(0).toUpperCase() + winner.slice(1)} Wins
        </Text>
        <Pressable
          onPress={() => {
            init();
            navigation.navigate('Play');
          }}
          style={{
            backgroundColor: '#AACB73',
            borderRadius: 15,
            width: width * 0.4,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 2,
          }}>
          <Text style={{color: 'white', fontSize: 22}}>New Game</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Stat;

const styles = StyleSheet.create({});
