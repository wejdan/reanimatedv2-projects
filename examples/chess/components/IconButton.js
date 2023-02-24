import {StyleSheet, Pressable, Text, View} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';

const IconButton = ({icon, text, onPress}) => {
  return (
    <Pressable onPress={onPress}>
      <View style={{alignItems: 'center'}}>
        <Feather name={icon} color="#b1b1b0" size={24} />
        <Text style={{color: '#b1b1b0'}}>{text}</Text>
      </View>
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({});
