import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Easing,
  PanResponder,
  Dimensions,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Button,
  Pressable,
} from 'react-native';

import React, {useEffect, useRef, useState} from 'react';
import Animated, {
  useSharedValue,
  interpolate,
  Extrapolate,
  withSpring,
  useAnimatedStyle,
  withTiming,
  runOnUI,
  useDerivedValue,
  useAnimatedReaction,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  ScrollView,
} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import {BlurView} from '@react-native-community/blur';
const {height: wheight, width} = Dimensions.get('window');
const height = wheight - StatusBar.currentHeight;
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = height / 1.8;

const clamp = (value, min, max) => {
  'worlet';
  return Math.max(Math.min(value, max), min);
};
const config = {
  damping: 15,
  mass: 1,
  stiffness: 200,
  overshootClamping: false,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 2,
};

const Modal = ({selectedItem, scrollY, onClose}) => {
  const animationProgress = useSharedValue(0);
  const opacity = useSharedValue(0);
  const [isEnabled, setEnalbed] = useState(true);

  const gesture = Gesture.Pan();
  const translateY = useSharedValue(selectedItem.y);
  const translateX = useSharedValue(selectedItem.x);
  const offsetY = useSharedValue(0);
  const isClosing = useSharedValue(false);

  const itemWidth = useSharedValue(selectedItem.width);

  const itemHeight = useSharedValue(selectedItem.height);
  const scale = useSharedValue(1);
  const borderRadius = useSharedValue(15);
  const textOpacity = useDerivedValue(() => {
    const a = (width - selectedItem.width) / 2;
    const b = selectedItem.width + a;
    //  console.log('b=', b, 'itemWidth', itemWidth.value, selectedItem.width);
    if (itemWidth.value > b) {
      return withTiming(1);
    } else {
      return withTiming(0);
    }
  }, [itemWidth]);
  const elevation = useSharedValue(5);
  const scollRef = useRef(null);
  const closeModal = () => {
    isClosing.value = true;
    setEnalbed(false);

    // translateY.value = withSpring(selectedItem.y, config);
    itemHeight.value = withSpring(selectedItem.height, config);

    translateX.value = withSpring(selectedItem.x, config);

    itemWidth.value = withSpring(selectedItem.width, config);
    borderRadius.value = withSpring(15, config);
    elevation.value = withTiming(5);
    opacity.value = withSpring(0, config);
    translateY.value = withSpring(selectedItem.y, config, isFinished => {
      //    animationProgress.value = 0;
    });
  };
  useAnimatedReaction(
    () => {
      return translateY.value;
    },
    data => {
      // data holds what was returned from the first worklet's execution
      if (isClosing.value) {
        if (Math.abs(data - selectedItem.y) < 0.25) {
          console.log('y====', data, 'target', selectedItem.y);
          //  cancelAnimation(translateY);
          onClose();
        }
      }
    },
    [translateY],
  );
  gesture.enabled(isEnabled);
  gesture.simultaneousWithExternalGesture(scollRef);
  gesture.onBegin(() => {
    offsetY.value = translateY.value;
  });

  gesture.onUpdate(e => {
    translateY.value = clamp(e.translationY + offsetY.value, 0, height);
    scale.value = interpolate(
      translateY.value,
      [0, 100],
      [1, 0.75],
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
    if (translateY.value > 100) {
      closeModal();
      // animationProgress.value = withTiming(0, {duration: 5000}, () => {
      //   onClose();
      // });
    } else {
      //   animationProgress.value = withSpring(1, config);
      translateY.value = withSpring(0, config);
      itemHeight.value = withSpring(height, config);
      itemWidth.value = withSpring(width, config);
      borderRadius.value = withSpring(0, config);
      //  translateY.value = withSpring(0, config);
      // scale.value = withSpring(1, config);
    }
    //
  });

  useEffect(() => {
    runOnUI(() => {
      'worklet';

      itemWidth.value = withSpring(width, config);

      itemHeight.value = withSpring(height, config);
      translateY.value = withSpring(0, config);

      translateX.value = withSpring(0, config);
      borderRadius.value = withSpring(0, config);
      opacity.value = withSpring(1, config);
      elevation.value = withTiming(0);
    })();
  }, []);
  const overlayStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const closeStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [1, 0.75], [1, 0]);

    return {
      opacity,
      transform: [
        {
          scale:
            isEnabled == false
              ? 0
              : interpolate(scale.value, [1, 0.75], [1, 0]),
        },
      ],
    };
  });

  const imgStyle = useAnimatedStyle(() => {
    return {
      elevation: elevation.value,
      borderTopLeftRadius: borderRadius.value,
      borderTopRightRadius: borderRadius.value,
      borderBottomLeftRadius: isEnabled ? 0 : borderRadius.value,
      borderBottomRightRadius: isEnabled ? 0 : borderRadius.value,
    };
  });

  const textStyle = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
    };
  });

  const headerStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      width: itemWidth.value,

      left: translateX.value,
      top: translateY.value,
      height: selectedItem.height,
      elevation: elevation.value,
      backgroundColor: 'white',
      borderRadius: borderRadius.value,
    };
  });
  const contentStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: 'white',
      position: 'absolute',
      width: itemWidth.value,
      height: itemHeight.value,
      left: translateX.value,
      top: translateY.value,
      borderRadius: borderRadius.value,

      paddingTop: selectedItem.height,
    };
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      //   elevation: 5,
      borderRadius: borderRadius.value,

      transform: [{scale: scale.value}],
    };
  });

  return (
    <>
      <Animated.View style={[{...StyleSheet.absoluteFill}, overlayStyle]}>
        <BlurView
          style={{...StyleSheet.absoluteFill}}
          blurType="light"
          blurAmount={6}
          reducedTransparencyFallbackColor="white"
        />
      </Animated.View>
      <GestureDetector waitFor={scollRef} gesture={gesture}>
        <Animated.View style={[{...StyleSheet.absoluteFill}, containerStyle]}>
          <Animated.View style={[contentStyle]}>
            <Animated.View style={[{padding: 16, flex: 1}, textStyle]}>
              <ScrollView simultaneousHandlers={[gesture]} ref={scollRef}>
                <Text style={{fontSize: 24, marginBottom: 16}}>
                  <Text style={{fontWeight: 'bold'}}>Lorem ipsum</Text> dolor
                  sit amet, consectetur adipiscing elit. Proin nec dolor sed
                  enim consequat consequat.
                </Text>
                <Text style={{fontSize: 24, marginBottom: 16}}>
                  Phasellus porta risus id leo consequat fermentum. Cras sed
                  justo ac odio malesuada malesuada.
                </Text>
              </ScrollView>
            </Animated.View>
          </Animated.View>

          <Animated.View style={headerStyle}>
            <Animated.Image
              source={{uri: selectedItem.item.url}}
              style={[{...StyleSheet.absoluteFill}, imgStyle]}
            />

            <View
              style={{
                //       elevation: 5,
                padding: 20,
                justifyContent: 'space-between',
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                //   backgroundColor: 'red',
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 30, color: 'white'}}>
                {selectedItem.item.name}
              </Text>
              <Text style={{color: 'white'}}>Subtitle</Text>
            </View>
            <Animated.View
              style={[closeStyle, {position: 'absolute', top: 10, right: 10}]}>
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
