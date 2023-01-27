import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Listing = ({title, items}) => {
  return (
    <View style={{marginTop: 10}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomColor: '#e8e5e8',
          borderBottomWidth: 1,
        }}>
        <Text
          style={{
            color: '#3a70d4',
            fontSize: 25,
            fontWeight: 'bold',
            paddingBottom: 8,
          }}>
          {title}
        </Text>
        <MaterialIcons name="more-horiz" color="#90b0e4" size={20} />
      </View>

      {items.map((item, i) => {
        return (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 8,
            }}
            key={i}>
            <MaterialCommunityIcons
              name="checkbox-blank-outline"
              color="#e8e5e8"
              size={25}
            />
            <Text style={{color: 'black', fontSize: 15}}>{item}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default Listing;

const styles = StyleSheet.create({});
