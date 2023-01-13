import {StyleSheet, Text, View, ScrollView, Dimensions} from 'react-native';
import React, {useRef} from 'react';

import {items, HEADER_MAX_HEIGHT} from './constants';
import MenuItem from './MenuItem';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Scroll from './Scroll';
const {width} = Dimensions.get('window');

const Content = ({Hscroll, scrollY, onMesaure, tabs, thisScroll}) => {
  return (
    <Scroll
      tabs={tabs}
      scrollY={scrollY}
      otherScroll={Hscroll}
      isHorzantal={false}
      ref={thisScroll}>
      <View style={{height: HEADER_MAX_HEIGHT}} />
      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: 10,
          borderBottomColor: '#ccc',
          borderBottomWidth: 2,
        }}>
        <View
          style={{
            flexDirection: 'row',

            alignItems: 'center',
          }}>
          <View style={{flex: 1}}>
            <Text style={{color: 'black', fontSize: 18}}>Resturant Info</Text>
            <Text
              numberOfLines={1}
              style={{color: '#999', fontSize: 14, marginVertical: 10}}>
              Robert Robertson, 1234 NW Bobcat Lane
            </Text>
          </View>

          <Text style={{fontSize: 14, color: '#6f9863'}}>More Info</Text>
        </View>
        <View
          style={{
            width: width * 0.8,
            alignSelf: 'center',
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 5,
            paddingHorizontal: 5,
            paddingVertical: 10,
            marginTop: 20,
          }}>
          <Text style={{fontSize: 12, color: '#aaa'}}>Order History</Text>
          <Text style={{marginVertical: 10}}>
            You last Order here on Oct 10,2019
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width,
          alignItems: 'center',
          paddingHorizontal: 10,
          paddingVertical: 15,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: '#555', fontSize: 17}}>Menu</Text>
          <AntDesign name="down" color="#ccc" size={14} />
        </View>
        <AntDesign name="search1" color="black" size={25} />
      </View>
      <Text
        style={{
          color: 'black',
          fontSize: 20,
          paddingHorizontal: 10,
          paddingBottom: 20,
        }}>
        Order Again
      </Text>

      {items.map((item, i) => {
        return <MenuItem index={i} onMesaure={onMesaure} item={item} key={i} />;
      })}
    </Scroll>
  );
};

export default Content;

const styles = StyleSheet.create({});
