import {StyleSheet} from 'react-native';
import React from 'react';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Navigation from './Navigation';
import {ContextProvider} from './Context';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ContextProvider>
        <Navigation />
      </ContextProvider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({});
