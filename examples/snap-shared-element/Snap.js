import {View, StyleSheet} from 'react-native';

import React, {useState} from 'react';
import Animated, {useSharedValue} from 'react-native-reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import Item from './Item';
import Details from './Details';
import videos from './Videos';

const Snap = () => {
  const scrollY = useSharedValue(0);

  const [selectedItem, setSelectedItem] = useState(null);

  const onClose = () => {
    setSelectedItem(null);
  };
  const getInfo = (ref, story) => {
    ref.current.measure((x0, y0, w, h, px, py) => {
      setSelectedItem({story: story, x: px, y: py, width: w, height: h});
    });
  };
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Animated.ScrollView
        style={{flex: 1}}
        onScroll={e => {
          scrollY.value = e.nativeEvent.contentOffset.y;
        }}>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {videos.map((story, i) => {
            return (
              <Item
                selectedItem={selectedItem}
                key={story.id}
                story={story}
                getInfo={getInfo}
              />
            );
          })}
        </View>
      </Animated.ScrollView>

      {selectedItem && (
        <Details selectedItem={selectedItem} onClose={onClose} />
      )}
    </GestureHandlerRootView>
  );
};

export default Snap;

const styles = StyleSheet.create({});
