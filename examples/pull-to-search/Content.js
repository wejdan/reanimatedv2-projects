import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Listing from './Listing';
const list1 = [
  'Tap this to-do',
  'Create a new to-do',
  'put this to-do in tody',
  'Reorder your to-do',
  'Create a project',
  'you are done',
];

const list2 = [
  'Show your calnder event',
  'Try using Siri with Things',
  'Enable the action extention',
  'Tap this to-do',
  'Thired from bottom',
  'Before Last',
  'Last',
  'Last2',
];
const Content = ({contentHeight}) => {
  return (
    <View style={{padding: 15}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <MaterialIcons name="radio-button-off" color="#4981ec" size={30} />
        <Text
          style={{
            fontWeight: 'bold',
            color: 'black',
            fontSize: 30,
            marginLeft: 10,
          }}>
          Meet Things IOS
        </Text>
      </View>
      <Text style={{marginVertical: 10}}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Text>
      <Listing title="Learn The Bascis" items={list1} />
      <Listing title="Tune your setup" items={list2} />
      <Listing title="Learn The Bascis" items={list1} />
      <Listing title="Tune your setup" items={list2} />
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({});
