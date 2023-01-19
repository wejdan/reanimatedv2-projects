import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';

import React, {useRef} from 'react';

import {Dimensions} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SafeAreaView} from 'react-native-safe-area-context';
export const {height: wheight, width} = Dimensions.get('window');
import DraggableList from './DraggableList';

const images = [
  {
    url: 'https://pbs.twimg.com/media/FW6XniVVsAAqtaL?format=jpg&name=medium',
  },
  {
    url: 'https://static.wikia.nocookie.net/heros/images/1/10/Bakugo_Infobox.jpg/revision/latest?cb=20200913110756&path-prefix=fr',
  },
  {
    url: 'https://i.pinimg.com/originals/d8/ab/f3/d8abf38f871b564b17b3f7e44a8a0644.jpg',
  },
  {
    url: 'https://staticg.sportskeeda.com/editor/2022/05/4c609-16539501898041-1920.jpg',
  },
  {
    url: 'https://i.pinimg.com/564x/ff/e7/76/ffe77627d9897368e8443855cded3b33.jpg',
  },
  {
    url: 'https://i0.wp.com/i.pinimg.com/736x/8f/8c/13/8f8c13e10c3ad16c3f2c3e6fa4418ecd.jpg?resize=160,120',
  },
  {
    url: 'https://staticg.sportskeeda.com/editor/2022/05/f8656-16522260581255-1920.jpg',
  },
  {
    url: 'https://i.pinimg.com/originals/d7/fb/37/d7fb37c2cd9cf33d39439af73463f695.png',
  },
  {
    url: 'https://pbs.twimg.com/media/FW0G2YrXwAENV5o?format=jpg&name=large',
  },
  {
    url: 'https://pbs.twimg.com/media/FWw8uk0X0AQW90U?format=jpg&name=large',
  },
  {
    url: 'https://pbs.twimg.com/media/FWtfvEuXwAI3Plw?format=jpg&name=900x900',
  },
  {
    url: 'https://pbs.twimg.com/media/FWtfvEsWYAAkJXn?format=jpg&name=900x900',
  },
  {
    url: 'https://pbs.twimg.com/media/FWpZsXwWQAAaTtw?format=jpg&name=900x900',
  },
  {
    url: 'https://pbs.twimg.com/media/FVwi_NbXsAIROYg?format=jpg&name=large',
  },
  {
    url: 'https://pbs.twimg.com/media/FVixyQzXwAAER4H?format=jpg&name=900x900',
  },
  {
    url: 'https://pbs.twimg.com/media/FVdgsviXoAAiEFa?format=jpg&name=medium',
  },
  {
    url: 'https://i1.sndcdn.com/avatars-Nwzcrz9NODq7BYxz-t9GSag-t500x500.jpg',
  },

  {
    url: 'https://data.whicdn.com/images/271896817/original.jpg',
  },
];
const TAB_COLUMNS = 2;
const ITEM_HEIGHT = width / TAB_COLUMNS;
const ITEM_WIDTH = width / TAB_COLUMNS;
const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
        <DraggableList cols={TAB_COLUMNS} itemHeight={ITEM_HEIGHT}>
          {images.map((img, i) => {
            return (
              <Image
                key={i}
                style={{
                  width: ITEM_WIDTH * 0.9,
                  height: ITEM_HEIGHT * 0.9,
                  borderRadius: 16,
                }}
                source={{uri: img.url}}
              />
            );
          })}
        </DraggableList>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
