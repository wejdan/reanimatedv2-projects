import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SIZE} from './constants';
import Cursor from './Cursor';
import {useDerivedValue, useSharedValue} from 'react-native-reanimated';
import {ReText} from 'react-native-redash';
import Progress from './Progress';
const App = () => {
  const startAngle = useSharedValue(0);
  const endAngle = useSharedValue(90);
  const isBedTimePM = useSharedValue(false);
  const isWakeupPM = useSharedValue(false);

  const startTime = useDerivedValue(() => {
    const t = (startAngle.value / 360) * 12;
    const mins = (t - Math.floor(t)) * 60;
    return `${Math.floor(t)} : ${Math.floor(mins)}`;
  });
  const endTime = useDerivedValue(() => {
    const t = (endAngle.value / 360) * 12;
    const mins = (t - Math.floor(t)) * 60;

    return `${Math.floor(t)} : ${Math.floor(mins)}`;
  });
  const sleepTime = useDerivedValue(() => {
    const startTime = (startAngle.value / 360) * 12;
    const endTime = (endAngle.value / 360) * 12;

    let d = endTime - startTime;
    if (d < 0) {
      d = 24 + d;
    }

    const mins = (d - Math.floor(d)) * 60;
    return `${Math.floor(d)} h ${Math.floor(mins)} mins`;
  });
  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1e1b20',
      }}>
      <View
        style={{
          backgroundColor: '#2e2b30',
          borderRadius: 15,
          width: '100%',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}>
          <View style={{alignItems: 'center'}}>
            <Text style={{color: '#817e86', fontWeight: 'bold'}}>BEDTIME</Text>

            <ReText
              text={startTime}
              style={{color: 'white', fontSize: 20, marginTop: 2}}
            />
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{color: '#817e86', fontWeight: 'bold'}}>WAKE UP</Text>
            <ReText
              text={endTime}
              style={{color: 'white', fontSize: 20, marginTop: 2}}
            />
          </View>
        </View>
        <View
          style={{
            width: SIZE,
            height: SIZE,
            borderRadius: SIZE / 2,
            //     backgroundColor: 'red',
          }}>
          <Progress
            endAngle={endAngle}
            startAngle={startAngle}
            isBedTimePM={isBedTimePM}
            isWakeupPM={isWakeupPM}
          />
          <Cursor angle={endAngle} isPM={isWakeupPM} />
          <Cursor angle={startAngle} isPM={isBedTimePM} />
        </View>

        <ReText
          text={sleepTime}
          style={{color: 'white', fontSize: 20, marginVertical: 20}}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({});
