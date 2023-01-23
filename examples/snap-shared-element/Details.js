import {View, StyleSheet, Dimensions, StatusBar} from 'react-native';
import Video from 'react-native-video';
const AnimatedVideo = Animated.createAnimatedComponent(Video);

import React, {useEffect} from 'react';
import Animated, {
  useSharedValue,
  interpolate,
  Extrapolate,
  withSpring,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  runOnUI,
  useDerivedValue,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

const {height: wheight, width} = Dimensions.get('window');
const height = wheight - StatusBar.currentHeight;
const CARD_WIDTH = width / 2;
const CARD_HEIGHT = 300;
const PADDING = 10;

const Details = ({
  selectedItem,

  onClose,
}) => {
  const config = {
    damping: 10,
    mass: 1,
    stiffness: 100,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
  };
  const animationProgress = useSharedValue(0);
  const scale = useSharedValue(1);
  const offset = useSharedValue(0);
  const offsetX = useSharedValue(0);
  const itemWidth = useDerivedValue(() => {
    const w = interpolate(
      animationProgress.value,
      [0, 1],
      [CARD_WIDTH, width],
      Extrapolate.CLAMP,
    );
    return withSpring(w, config);
  }, [animationProgress]);
  const itemHeight = useDerivedValue(() => {
    const h = interpolate(
      animationProgress.value,
      [0, 1],
      [CARD_HEIGHT, height],
      Extrapolate.CLAMP,
    );
    return withSpring(h, config);
  }, [animationProgress]);
  const translateX = useDerivedValue(() => {
    const x = interpolate(
      animationProgress.value,
      [0, 1],
      [selectedItem.x, 0],
      Extrapolate.CLAMP,
    );
    return withSpring(x, config);
  }, [animationProgress]);
  const translateY = useDerivedValue(() => {
    const y = interpolate(
      animationProgress.value,
      [0, 1],
      [selectedItem.y, 0],
      Extrapolate.CLAMP,
    );
    return withSpring(y, config);
  }, [animationProgress]);
  const opacity = useSharedValue(0);
  useEffect(() => {
    runOnUI(() => {
      'worklet';
      animationProgress.value = withTiming(1, config, () => {
        opacity.value = withTiming(1);
      });
    })();
  }, []);
  const overlayStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: 'black',

      opacity: opacity.value,
    };
  });
  const rStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      width: itemWidth.value,
      height: itemHeight.value,
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
        {scale: scale.value},
      ],
    };
  });

  const gesture = Gesture.Pan();
  gesture.activeOffsetY([-50, 50]);
  gesture.onStart(() => {
    offset.value = translateY.value;
    offsetX.value = translateX.value;
  });
  gesture.onUpdate(e => {
    translateY.value = e.translationY + offset.value;
    translateX.value = e.translationX + offsetX.value;
    scale.value = interpolate(
      translateY.value,
      [-250, 0, 250],
      [0.65, 1, 0.65],
    );

    opacity.value = interpolate(translateY.value, [-200, 0, 200], [0, 1, 0]);
  });
  gesture.onEnd(e => {
    if (Math.abs(translateY.value) < 40) {
      itemHeight.value = withSpring(height, config);
      itemWidth.value = withSpring(width, config);
      translateX.value = withSpring(0, config);
      translateY.value = withSpring(0, config);
    } else {
      animationProgress.value = withTiming(0, config, isFinished => {
        if (isFinished) {
          runOnJS(onClose)();
        }
      });

      scale.value = withTiming(1);
    }
  });
  return (
    <View style={{...StyleSheet.absoluteFill}}>
      <Animated.View style={[{...StyleSheet.absoluteFill}, overlayStyle]} />
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            {
              width: CARD_WIDTH,
              height: CARD_HEIGHT,
              padding: PADDING,
            },
            rStyle,
          ]}>
          <AnimatedVideo
            source={selectedItem.story.video}
            style={styles.img}
            controls={true}
            resizeMode="cover"
            paused={false}
          />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  img: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
  },
});
