import {StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Play from './screens/Play';
import Promotion from './screens/Promotion';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Stats from './screens/Stats';

const Stack = createNativeStackNavigator();
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};
const App = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer theme={navTheme}>
          <Stack.Navigator
            mode="modal"
            screenOptions={{
              headerShown: false,
              cardStyle: {backgroundColor: 'transparent'},
              presentation: 'modal',
            }}>
            <Stack.Screen name="Play" component={Play} />

            <Stack.Screen
              name="Promotion"
              component={Promotion}
              options={{presentation: 'transparentModal'}}
            />

            <Stack.Screen
              name="Stats"
              component={Stats}
              options={{presentation: 'transparentModal'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
