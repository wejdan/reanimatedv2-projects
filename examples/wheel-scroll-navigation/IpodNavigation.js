import React from 'react';
import {Dimensions, View, StyleSheet} from 'react-native';
import {
  useNavigationBuilder,
  createNavigatorFactory,
  StackRouter,
  useRoute,
} from '@react-navigation/native';

import Wheel from './Wheel';

const {width} = Dimensions.get('window');
export const SCREEN_SIZE = width - 32;
export const CONTENT_HEIGHT = SCREEN_SIZE;
export const useParams = () => {
  const route = useRoute();
  return route.params;
};
function IpodNavigator({
  initialRouteName,
  children,
  screenOptions,
  tabBarStyle,
  contentStyle,
}) {
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
        {state.routes.map((route, i) => {
          const Screen = descriptors[route.key].render;

          return (
            <View
              key={route.key}
              style={[
                StyleSheet.absoluteFill,
                {display: i === state.index ? 'flex' : 'none'},
              ]}>
              {/* {descriptors[route.key].render()} */}
              {/* {children[i].props.component()} */}

              {<Screen />}
            </View>
          );
        })}
      </View>

      <Wheel />
    </View>
  );
}

export const createIPodNavigator = createNavigatorFactory(IpodNavigator);
