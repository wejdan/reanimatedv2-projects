import React from 'react';
import {Text, Dimensions, Pressable, View, StyleSheet} from 'react-native';
import {
  useNavigationBuilder,
  createNavigatorFactory,
  StackRouter,
  useRoute,
} from '@react-navigation/native';

import Wheel from './Wheel';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const {width} = Dimensions.get('window');
export const SCREEN_SIZE = width - 32;
export const CONTENT_HEIGHT = SCREEN_SIZE;
export const useParams = () => {
  const route = useRoute();
  return route.params;
};
function IpodNavigator({initialRouteName, children, screenOptions}) {
  const {state, navigation, descriptors, NavigationContent} =
    useNavigationBuilder(StackRouter, {
      children,
      screenOptions,
      initialRouteName,
    });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}>
      <View
        style={{
          width: SCREEN_SIZE,
          height: SCREEN_SIZE,
          backgroundColor: 'white',
          borderRadius: 16,
          overflow: 'hidden',
        }}>
        {state.routes.map((currentRoute, i) => {
          const Screen = descriptors[currentRoute.key].render;

          return (
            <View
              key={route.key}
              style={[
                StyleSheet.absoluteFill,
                {display: i === state.index ? 'flex' : 'none'},
              ]}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  paddingTop: 10,
                  zIndex: 10,
                }}>
                <Text style={{color: 'black', fontWeight: 'bold'}}>19:08</Text>
              </View>
              <View
                style={{position: 'absolute', top: 10, right: 10, zIndex: 10}}>
                <FontAwesome name="battery-2" size={18} color="#21cf72" />
              </View>
              <Screen />
            </View>
          );
        })}
      </View>

      <Wheel />
    </View>
  );
}

export const createIPodNavigator = createNavigatorFactory(IpodNavigator);
