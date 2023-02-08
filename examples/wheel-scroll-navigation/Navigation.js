import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Playlists from './screens/Playlists';
import Albums from './screens/Albums';
import Artists from './screens/Artists';
import Songs from './screens/Songs';
import Menu from './screens/Menu';
import Player from './screens/Player';
import Settings from './screens/Settings';
import Shuffle from './screens/Shuffle';
import {createIPodNavigator} from './IpodNavigation';
import {NavigationContainer} from '@react-navigation/native';

//const Stack = createStackNavigator();

const Stack = createIPodNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Menu" component={Menu} />
        {props => <HomeScreen {...props} text={homeText} />}
        <Stack.Screen name="Playlists" component={Playlists} />
        <Stack.Screen name="Albums" component={Albums} />
        <Stack.Screen name="Artists" component={Artists} />
        <Stack.Screen name="Songs" component={Songs} />
        <Stack.Screen name="Player" component={Player} />

        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Shuffle" component={Shuffle} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
