import {StyleSheet, View} from 'react-native';
import React, {useContext} from 'react';
import IconButton from './IconButton';
import {Context} from '../Context';

const BottomBar = () => {
  const {goBack, goForward} = useContext(Context);

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: 'black',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <IconButton icon="list" text="Options" />
      <IconButton icon="search" text="Analysis" />

      <IconButton icon="chevron-left" text="Back" onPress={goBack} />

      <IconButton icon="chevron-right" text="Forward" onPress={goForward} />
    </View>
  );
};

export default BottomBar;

const styles = StyleSheet.create({});
