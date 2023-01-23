import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  Image,
  Pressable,
} from 'react-native';

import React, {useEffect} from 'react';
import Animated, {
  useSharedValue,
  interpolate,
  Extrapolate,
  withSpring,
  useAnimatedStyle,
  withTiming,
  runOnUI,
  useAnimatedReaction,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';

const {height: wheight, width} = Dimensions.get('window');
const height = wheight - StatusBar.currentHeight;
const clamp = (value, min, max) => {
  'worlet';
  return Math.max(Math.min(value, max), min);
};
const FINAL_IMGE_HEIGHT = 300;
const config = {
  damping: 15,
  mass: 1,
  stiffness: 200,
  overshootClamping: false,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 2,
};
const Modal = ({selectedItem, onClose}) => {
  const translateY = useSharedValue(selectedItem.y);
  const translateX = useSharedValue(selectedItem.x);
  const isClosing = useSharedValue(false);
  const scale = useSharedValue(1);
  const borderRadius = useSharedValue(0);

  const itemWidth = useSharedValue(selectedItem.width);
  const itemHeight = useSharedValue(selectedItem.height);
  const gesture = Gesture.Pan();

  const sharedElementStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      borderTopLeftRadius: borderRadius.value,
      borderTopRightRadius: borderRadius.value,

      overflow: 'hidden',
      width: itemWidth.value,

      left: translateX.value,
      top: translateY.value,
      height: itemHeight.value,
      backgroundColor: 'white',
    };
  });

  const contentStyle = useAnimatedStyle(() => {
    const y = interpolate(
      itemWidth.value,
      [width / 2, width],
      [height, 0],
      Extrapolate.CLAMP,
    );
    return {
      borderRadius: borderRadius.value,
      position: 'absolute',
      width: itemWidth.value,
      height,
      paddingTop: FINAL_IMGE_HEIGHT + 10,
      top: isClosing.value ? withSpring(height, config) : translateY.value,
      left: translateX.value,
    };
  });
  const iconStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scale.value,
      [0.9, 1],
      [0, 1],
      Extrapolate.CLAMP,
    );
    return {
      opacity: isClosing.value ? withTiming(0) : opacity,
    };
  });
  const textStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      itemWidth.value,
      [selectedItem.width, width],
      [0, 1],
    );
    return {
      opacity,
    };
  });
  const closeModal = () => {
    isClosing.value = true;
    itemHeight.value = withSpring(selectedItem.height, config);

    translateX.value = withSpring(selectedItem.x, config);

    itemWidth.value = withSpring(selectedItem.width, config);

    translateY.value = withSpring(selectedItem.y, config);
    borderRadius.value = withSpring(0, config);
  };
  useEffect(() => {
    runOnUI(() => {
      'worklet';

      itemWidth.value = withTiming(width);

      itemHeight.value = withTiming(FINAL_IMGE_HEIGHT);
      translateY.value = withSpring(0, config);

      translateX.value = withSpring(0, config);
    })();
  }, []);
  useAnimatedReaction(
    () => {
      return itemWidth.value;
    },
    data => {
      // data holds what was returned from the first worklet's execution
      console.log(data);
      if (isClosing.value && data == selectedItem.width) {
        onClose();
      }
    },
  );

  gesture.onUpdate(e => {
    translateY.value = clamp(e.translationY, 0, height);
    scale.value = interpolate(
      translateY.value,
      [0, 100],
      [1, 0.75],
      Extrapolate.CLAMP,
    );

    borderRadius.value = interpolate(
      translateY.value,
      [0, 100],
      [1, 15],
      Extrapolate.CLAMP,
    );
  });
  gesture.onEnd(e => {
    scale.value = withSpring(1, config);
    if (translateY.value > 100) {
      closeModal();
    } else {
      //   animationProgress.value = withSpring(1, config);
      translateY.value = withSpring(0, config);
      itemHeight.value = withSpring(FINAL_IMGE_HEIGHT, config);
      itemWidth.value = withSpring(width, config);
      borderRadius.value = withSpring(0, config);
    }
    //
  });
  const overlayStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [0, selectedItem.y],
      [0.5, 0],
      Extrapolate.CLAMP,
    );
    return {
      opacity,
    };
  });
  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });
  return (
    <>
      <Animated.View
        style={[
          overlayStyle,
          {...StyleSheet.absoluteFill, backgroundColor: 'black'},
        ]}
      />
      <GestureDetector gesture={gesture}>
        <Animated.View style={[{...StyleSheet.absoluteFill}, containerStyle]}>
          <Animated.View
            style={[
              {
                backgroundColor: 'white',
                paddingHorizontal: 15,
              },
              contentStyle,
            ]}>
            <Animated.View style={textStyle}>
              <Text style={{fontSize: 30, fontWeight: 'bold', color: 'black'}}>
                {selectedItem.item.name}
              </Text>
              <Text>{selectedItem.item.info}</Text>
            </Animated.View>
          </Animated.View>
          <Animated.View style={sharedElementStyle}>
            <Image
              source={{
                uri: selectedItem.item.url,
              }}
              style={[{...StyleSheet.absoluteFill}]}
            />

            <Animated.View
              style={[iconStyle, {position: 'absolute', top: 10, right: 10}]}>
              <Pressable
                onPress={() => {
                  //   alert('123');
                  closeModal();
                }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 30,
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Feather name="x" size={24} color="black" />
                </View>
              </Pressable>
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </>
  );
};

export default Modal;

const styles = StyleSheet.create({});
