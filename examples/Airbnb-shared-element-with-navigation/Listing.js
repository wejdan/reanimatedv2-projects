import {
  Image,
  StyleSheet,
  Text,
  Dimensions,
  StatusBar,
  View,
  Pressable,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {SharedElement} from 'react-navigation-shared-element';
import Animated, {
  useSharedValue,
  interpolate,
  Extrapolate,
  withSpring,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  ScrollView,
} from 'react-native-gesture-handler';

const {height: wheight, width} = Dimensions.get('window');
const height = wheight - StatusBar.currentHeight;
const config = {
  damping: 15,
  mass: 1,
  stiffness: 200,
  overshootClamping: false,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 2,
};
const clamp = (value, min, max) => {
  'worlet';
  return Math.max(Math.min(value, max), min);
};
const snapPoint = (number, points) => {
  'worklet';
  const deltas = points.map(p => {
    return Math.abs(number - p);
  });
  const min = Math.min.apply(0, deltas);
  const point = points.filter(p => {
    return Math.abs(number - p) == min;
  });
  return point[0];
};
const Listing = ({route, navigation}) => {
  /* 2. Get the param */
  const scollRef = useRef(null);

  const {post} = route.params;
  const gesture = Gesture.Pan();
  const translateY = useSharedValue(0);
  const offsetY = useSharedValue(0);

  const translateX = useSharedValue(0);
  const offsetX = useSharedValue(0);
  const scale = useSharedValue(1);
  const borderRadius = useSharedValue(0);
  gesture.simultaneousWithExternalGesture(scollRef);

  gesture.onBegin(() => {
    offsetY.value = translateY.value;
    offsetX.value = translateX.value;
  });

  gesture.onUpdate(e => {
    translateY.value = clamp(e.translationY + offsetY.value, 0, height);
    translateX.value = e.translationX + offsetX.value;

    scale.value = interpolate(
      translateY.value,
      [0, 100],
      [1, 0.8],
      Extrapolate.CLAMP,
    );
    borderRadius.value = interpolate(
      translateY.value,
      [0, 100],
      [0, 15],
      Extrapolate.CLAMP,
    );
  });
  gesture.onEnd(e => {
    scale.value = withSpring(1, config);
    const point = snapPoint(translateY.value, [0, height / 2]);
    console.log(point);
    if (point != 0) {
      navigation.goBack();
    } else {
      translateY.value = withSpring(0, config);
      translateX.value = withSpring(0, config);
      borderRadius.value = withTiming(0);
    }
    //
  });

  const iconStyle = useAnimatedStyle(() => {
    return {
      opacity: borderRadius.value == 0 ? withTiming(1) : withTiming(0),
    };
  });
  const containerStyle = useAnimatedStyle(() => {
    return {
      //   elevation: 5,
      borderRadius: borderRadius.value,
      overflow: 'hidden',
      transform: [
        {translateY: translateY.value},
        {translateX: translateX.value},
        {scale: scale.value},
      ],
    };
  });

  return (
    <Animated.View
      style={[{flex: 1, backgroundColor: 'white'}, containerStyle]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={scollRef}
        style={{flex: 1}}>
        <GestureDetector gesture={gesture}>
          <SharedElement id={post.id}>
            <Image
              resizeMode="stretch"
              style={{width, height: height / 2}}
              source={{uri: post.picture}}
            />
          </SharedElement>
        </GestureDetector>

        <View style={{padding: 10}}>
          <Text style={{fontSize: 30, fontWeight: '100', color: 'black'}}>
            {post.title}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 15,
              }}>
              <Ionicons name="star" size={16} color="#ff2e56" />
              <Text
                style={{
                  fontSize: 12,
                  marginHorizontal: 3,
                  color: '#999',
                }}>
                {post.rating}
              </Text>
              <Text style={{fontSize: 12, color: '#999'}}>
                ({post.ratingCount})
              </Text>
            </View>

            <View
              style={{
                marginLeft: 20,
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 15,
              }}>
              <FontAwesome5 name="medal" size={14} color="#ff2e56" />
              <Text
                style={{
                  fontSize: 12,
                  marginHorizontal: 3,
                  color: '#999',
                }}>
                {post.rating}
              </Text>
              <Text style={{fontSize: 12, color: '#999'}}>
                ({post.ratingCount})
              </Text>
            </View>
          </View>

          <Text style={{marginBottom: 20}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt
          </Text>
          <View
            style={{
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderColor: '#ccc',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 10,
            }}>
            <View>
              <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>
                {post.title}
              </Text>
              <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>
                Hosted by Eliza
              </Text>
            </View>
            <View>
              <Image
                source={{
                  uri: 'https://github.com/wcandillon/can-it-be-done-in-react-native/blob/master/season3/src/Airbnb/assets/host.jpg?raw=true',
                }}
                style={{width: 100, height: 100, borderRadius: 50}}
              />
            </View>
          </View>

          <View style={{paddingVertical: 10}}>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </View>
        </View>
      </ScrollView>
      <Animated.View
        style={[{position: 'absolute', left: 10, top: 10}, iconStyle]}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons name="close" size={24} color="white" />
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
};

export default Listing;

const styles = StyleSheet.create({});
