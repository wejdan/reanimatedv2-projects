import {StyleSheet, Dimensions, Text, View} from 'react-native';
import React, {useContext} from 'react';
import Animated from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {Context} from '../Context';
import {useNavigation} from '@react-navigation/native';
import {runOnJS} from 'react-native-reanimated/lib/reanimated2/core';
export const {height, width} = Dimensions.get('window');
import {calculateMovs} from '../utils/movesCalculation';

const color1 = '#fcfed5';
const color2 = '#648840';

export const SIZE = width / 8;
export const WIDTH = width;
export const HEIGHT = SIZE * 8;
const Transparent = () => {
  const {
    movs,
    turn,
    setMovs,
    active,
    setIsCheckMate,
    isCheckMate,
    board,
    forward,
    history,
  } = useContext(Context);
  const navigation = useNavigation();

  return (
    <View
      style={{
        position: 'absolute',
        width: WIDTH,
        height: HEIGHT,
      }}>
      {movs.map((m, j) => {
        const [row, col] = m.split('*');
        const tapGesture = Gesture.Tap();
        tapGesture.shouldCancelWhenOutside(true);
        tapGesture.onBegin(e => {
          setMovs([]);

          const key = `${row}` + '*' + `${col}`;

          const newPositions = [...board.value];
          const current = newPositions[active.value];
          const isCheck = calculateMovs(row, col, current, board.value, true);
          const oldHistory = [...history.value];
          oldHistory.push({board: board.value, isCheck: isCheckMate});
          setIsCheckMate(isCheck);

          history.value = oldHistory;
          forward.value = [];
          const oldPiece = newPositions.find(
            p => p.pos == key && p.isDeleted == false,
          );

          if (oldPiece == undefined) {
            newPositions[active.value] = {
              ...current,
              pos: key,

              moved: true,
            };
            board.value = newPositions;
          } else if (
            oldPiece.name != current.name &&
            oldPiece.player != current.player
          ) {
            const newIndex = newPositions.findIndex(
              p => p.pos == key && p.isDeleted == false,
            );

            newPositions[newIndex] = {
              ...oldPiece,
              isDeleted: true,
            };
            newPositions[active.value] = {
              ...current,
              pos: key,

              moved: true,
            };
            board.value = newPositions;
            if (oldPiece.type == 'king') {
              navigation.navigate('Stats', {winner: current.player});
            }
            // console.log(oldPiece.name, name);
          }
          turn.value = turn.value == 'black' ? 'white' : 'black';
        });

        return (
          <GestureDetector key={m} gesture={tapGesture}>
            <Animated.View
              style={{
                position: 'absolute',
                width: SIZE,
                height: SIZE,
                left: col * SIZE,
                top: row * SIZE,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: SIZE / 2,
                  height: SIZE / 2,
                  backgroundColor: 'black',
                  borderRadius: SIZE / 2,
                  opacity: 0.3,
                }}
              />
            </Animated.View>
          </GestureDetector>
        );
      })}
    </View>
  );
};

export default Transparent;

const styles = StyleSheet.create({});
