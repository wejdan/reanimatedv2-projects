import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Explore from './Explore';
import Listing from './Listing';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

const Stack = createSharedElementStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator
            mode="modal"
            screenOptions={{
              headerShown: false,
              cardStyle: {backgroundColor: 'transparent'},
              cardStyleInterpolator: ({current: {progress}}) => {
                const opacity = progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                  extrapolate: 'clamp',
                });
                return {cardStyle: {opacity}};
              },
            }}>
            <Stack.Screen name="Explore" component={Explore} />
            <Stack.Screen
              name="Listing"
              component={Listing}
              sharedElements={route => {
                return [route.params.post.id];
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
