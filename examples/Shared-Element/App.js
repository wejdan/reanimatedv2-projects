import {View, StyleSheet, Dimensions, Image, Pressable} from 'react-native';

import React, {useRef, useState} from 'react';
import {runOnJS} from 'react-native-reanimated';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import {List} from './data';
import Modal from './Modal';
const {height: wheight, width} = Dimensions.get('window');

const App = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const onItemPress = (ref, item) => {
    ref.current.measure((x0, y0, w, h, px, py) => {
      setSelectedItem({item: item, x: px, y: py, width: w, height: h});
    });
  };
  const onClose = () => {
    'worklet';

    runOnJS(setSelectedItem)(null);
  };
  const CARD_WIDTH = width / 3;
  const CARD_HEIGHT = width / 3;
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ScrollView scrollEnabled={selectedItem == null} style={{flex: 1}}>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {List.map((item, i) => {
            const ref = useRef(null);

            return (
              <Pressable
                key={i}
                onPress={() => {
                  onItemPress(ref, item);
                }}>
                <View
                  ref={ref}
                  collapsable={false}
                  style={[
                    {
                      elevation: 5,
                      width: CARD_WIDTH,
                      height: CARD_HEIGHT,
                      // borderRadius: 15,
                      //  overflow: 'hidden',
                      opacity: selectedItem?.item.id == item.id ? 0 : 1,

                      padding: 20,
                      justifyContent: 'space-between',
                    },
                  ]}>
                  <Image
                    source={{
                      uri: item.url,
                    }}
                    style={{...StyleSheet.absoluteFill, borderRadius: 0}}
                  />
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {selectedItem && <Modal selectedItem={selectedItem} onClose={onClose} />}
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({});
