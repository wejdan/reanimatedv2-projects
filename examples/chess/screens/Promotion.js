import {StyleSheet, Text, Image, View, Pressable} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {SIZE, width} from '../components/Background';
import {white, black} from '../utils/data';
import {Context} from '../Context';
import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
const Promotion = ({navigation, route}) => {
  const {turn, board, active} = useContext(Context);
  /* 2. Get the param */
  const {setImg} = route.params;
  const [list, setList] = useState([]);
  useEffect(() => {
    if (turn.value == 'white') {
      setList(black);
    } else {
      setList(white);
    }
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}>
      <View
        style={{
          width: width * 0.8,
          height: SIZE * 2.5,
          backgroundColor: 'white',
          justifyContent: 'space-around',
          alignItems: 'center',
          borderRadius: 15,
          flexDirection: 'row',
        }}>
        {list.slice(0, 4).map((p, i) => {
          return (
            <Pressable
              key={i}
              onPress={() => {
                //   alert(p.type);
                const newPositions = [...board.value];
                const current = newPositions[active.value];
                newPositions[active.value] = {
                  ...current,
                  type: p.type,

                  moved: true,
                };
                board.value = newPositions;
                setImg(p.img);
                navigation.navigate('Play');
              }}>
              <Image source={p.img} style={{width: SIZE, height: SIZE}} />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default Promotion;

const styles = StyleSheet.create({});
