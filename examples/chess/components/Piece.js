import {StyleSheet, Vibration, Text, View} from 'react-native';
import React, {useState, useContext} from 'react';
import {SIZE} from './Background';
import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
  useAnimatedReaction,
  useAnimatedProps,
  interpolate,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {calculateMovs} from '../utils/movesCalculation';
import {runOnJS} from 'react-native-reanimated/lib/reanimated2/core';
import {black, white} from '../utils/data';
import {Context} from '../Context';
const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  2 * ONE_SECOND_IN_MS,
  3 * ONE_SECOND_IN_MS,
];
const Piece = ({
  img,

  index,
  name,

  player,
}) => {
  const {turn, board, rotate, active, setMovs} = useContext(Context);
  const navigation = useNavigation();

  const [srcImg, setImg] = useState(img);
  const x = useDerivedValue(() => {
    if (board.value[index].pos) {
      const col = board.value[index].pos.split('*')[1];

      return withTiming(SIZE * col);
    }
  });
  const y = useDerivedValue(() => {
    if (board.value[index].pos) {
      const row = board.value[index].pos.split('*')[0];
      return withTiming(SIZE * row);
    }
  });
  const type = useDerivedValue(() => {
    return board.value[index].type;
  });
  const isPromotion = useDerivedValue(() => {
    if (type.value == 'pawn') {
      if (board.value[index].pos) {
        const row = board.value[index].pos.split('*')[0];

        return player == 'black' ? row == 7 : row == 0;
      } else {
        return false;
      }
    }
  });
  const opacity = useSharedValue(1);

  useAnimatedReaction(
    () => {
      return isPromotion.value;
    },
    data => {
      if (data == true) {
        runOnJS(navigation.navigate)('Promotion', {
          setImg,
        });
      } else if (data == false) {
        runOnJS(setImg)(img);
      }
    },
    [],
  );
  useAnimatedReaction(
    () => {
      return board.value;
    },
    data => {
      if (data[index].isDeleted) {
        opacity.value = withTiming(0);
      } else if (data[index].isDeleted == false && opacity.value == 0) {
        opacity.value = 1;
      }
    },
    [],
  );

  const rnStyle = useAnimatedStyle(() => {
    const r = rotate.value + 'deg';
    return {
      opacity: opacity.value,
      left: x.value,
      top: y.value,
      transform: [
        {
          rotate: r,
        },
      ],
    };
  });
  const tapGesture = Gesture.Tap();
  tapGesture.onBegin(() => {
    if (turn.value == player) {
      active.value = index;
      const row = board.value[index].pos.split('*')[0];
      const col = board.value[index].pos.split('*')[1];
      const tmpMovs = calculateMovs(
        row,
        col,
        board.value[index],
        board.value,
        false,
      );
      setMovs(tmpMovs);
    } else {
      Vibration.vibrate();
    }
  });

  return (
    <GestureDetector gesture={tapGesture}>
      <Animated.View
        style={[
          {
            ...StyleSheet.absoluteFill,
            width: SIZE,
            height: SIZE,
          },
          rnStyle,
        ]}>
        <Image
          style={{
            ...StyleSheet.absoluteFill,
            width: undefined,
            height: undefined,
          }}
          source={srcImg}
        />
      </Animated.View>
    </GestureDetector>
  );
};

export default Piece;

const styles = StyleSheet.create({});
