import {StyleSheet, TextInput, View} from 'react-native';
import React, {useContext} from 'react';
import Background, {height, HEIGHT, WIDTH} from '../components/Background';
import Animated, {useAnimatedProps} from 'react-native-reanimated';
import Piece from '../components/Piece';
import Transparent from '../components/Transparent';
import {black, white} from '../utils/data';
import {Text} from 'react-native';
import {Context} from '../Context';
import BottomBar from '../components/BottomBar';
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const soldires = Array(8)
  .fill()
  .map((v, i) => i);

const Play = () => {
  const {turn, isCheckMate} = useContext(Context);

  const animatedProps = useAnimatedProps(() => {
    return {
      text: `Turn: ${turn.value}`,
    };
  });
  return (
    <View style={{flex: 1, backgroundColor: '#1c1b19'}}>
      <View
        style={{
          width: WIDTH,
          justifyContent: 'center',
          alignItems: 'center',
          height: (height - HEIGHT) / 2,
        }}>
        <AnimatedTextInput
          underlineColorAndroid="transparent"
          editable={false}
          style={{color: 'white', fontSize: 30, fontVariant: ['tabular-nums']}}
          animatedProps={animatedProps}
        />
      </View>
      <View style={{width: WIDTH, height: HEIGHT}}>
        <Background />

        {black.map((p, i) => {
          return (
            <Piece
              key={i}
              img={p.img}
              type={p.type}
              player={p.player}
              name={p.name}
              index={i}
            />
          );
        })}

        {soldires.map((_, i) => {
          return (
            <Piece
              key={i}
              img={require('../assets/bp.png')}
              type="pawn"
              player="black"
              name={'bp' + i}
              index={8 + i}
            />
          );
        })}

        {white.map((p, i) => {
          return (
            <Piece
              key={i}
              img={p.img}
              type={p.type}
              player={p.player}
              name={p.name}
              index={i + 24}
            />
          );
        })}

        {soldires.map((_, i) => {
          return (
            <Piece
              key={i}
              img={require('../assets/wp.png')}
              type="pawn"
              player="white"
              name={'wp' + i}
              index={16 + i}
            />
          );
        })}
        <Transparent />
      </View>
      {isCheckMate && (
        <View
          style={{
            width: WIDTH,
            justifyContent: 'center',
            alignItems: 'center',
            height: (height - HEIGHT - 100) / 2,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 30,
              fontVariant: ['tabular-nums'],
            }}>
            CHEECK MATE
          </Text>
        </View>
      )}
      <BottomBar />
    </View>
  );
};

export default Play;

const styles = StyleSheet.create({});
