import {Image, StyleSheet, Text, View} from 'react-native';
import React, {forwardRef} from 'react';

const MenuItem = forwardRef(({item, onMesaure, index}, ref) => {
  return (
    <View
      collapsable
      ref={ref}
      onLayout={e => {
        onMesaure(index, -e.nativeEvent.layout.y + e.nativeEvent.layout.height);
      }}
      style={{
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        flexDirection: 'row',

        alignItems: 'center',
      }}>
      <View style={{flex: 1}}>
        <Text style={{color: 'black', fontSize: 18}}>{item.title}</Text>
        <Text
          numberOfLines={1}
          style={{color: '#999', fontSize: 14, marginVertical: 10}}>
          {item.description}
        </Text>
        <Text style={{fontSize: 14}}>{item.price}</Text>
      </View>
      <Image
        style={{width: 60, height: 60}}
        source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAuH1eEP7DWGYbdrOl2pbiWr1Ry3f2ogftpg&usqp=CAU',
        }}
      />
    </View>
  );
});

export default MenuItem;

const styles = StyleSheet.create({});
