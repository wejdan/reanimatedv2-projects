import {StyleSheet, Dimensions, StatusBar} from 'react-native';

import React, {useRef, useState} from 'react';
import {useSharedValue, runOnJS} from 'react-native-reanimated';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import Item from './Item';
import {images} from './data';
import Modal from './Modal';
const {height: wheight, width} = Dimensions.get('window');
const height = wheight - StatusBar.currentHeight;

const CARD_HEIGHT = height / 1.8;
const MARGIN = 10;
const App = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const scrollY = useSharedValue(0);
  const scrollref = useRef(null);
  const onItemPress = (ref, item, i) => {
    ref.current.measure((x0, y0, w, h, px, py) => {
      console.log('y=', py, CARD_HEIGHT * i + MARGIN * 2);
      setSelectedItem({item: item, x: px, y: py, width: w, height: h});
    });
  };
  const onClose = () => {
    'worklet';

    runOnJS(setSelectedItem)(null);
  };
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ScrollView
        ref={scrollref}
        contentContainerStyle={{width, alignItems: 'center'}}
        showsVerticalScrollIndicator={false}
        onScroll={e => {
          scrollY.value = e.nativeEvent.contentOffset.y;
        }}>
        {images.map((item, i) => {
          return (
            <Item
              scrollref={scrollref}
              onPress={onItemPress}
              key={item.id}
              index={i}
              selectedItem={selectedItem}
              item={item}
            />
          );
        })}
      </ScrollView>
      {selectedItem && (
        <Modal
          scrollY={scrollY}
          selectedItem={selectedItem}
          onClose={onClose}
        />
      )}
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({});
