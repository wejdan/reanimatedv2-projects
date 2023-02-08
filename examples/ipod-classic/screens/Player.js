import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {
  useState,
  useEffect,
  useContext,
  useImperativeHandle,
} from 'react';
import {Image} from 'react-native';
import {useParams} from '../IpodNavigation';
import data from '../data';
import {ReText} from 'react-native-redash';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useIsFocused} from '@react-navigation/native';
import TrackPlayer, {
  State,
  Event,
  Capability,
  usePlaybackState,
  useProgress,
  RepeatMode,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import {Context} from '../Context';

const {width} = Dimensions.get('window');
const SCREEN_SIZE = width - 32;
const COVER_SIZE = SCREEN_SIZE * 0.5 - 16;
TrackPlayer.setupPlayer();

const timeFormat = s => {
  const mins = Math.floor(s / 60).toString();
  const seconds = Math.round(s % 60).toString();
  return `${mins.length == 1 ? '0' + mins : mins}:${
    seconds.length == 1 ? '0' + seconds : seconds
  }`;
};

const PlayerComponent = React.forwardRef(({entries, selected}, ref) => {
  const playbackState = usePlaybackState();

  const progress = useProgress();
  const [index, setIndex] = useState(0);

  const entry = entries[index];

  const tracks = entries.map((e, i) => {
    return {...e.track, url: e.track.uri};
  });
  const start = async () => {
    await TrackPlayer.add(tracks);
  };

  const next = async index => {
    setIndex(index);

    await TrackPlayer.skip(index);
  };
  const TogglePlay = async playbackState => {
    const state = await TrackPlayer.getState();
    console.log('playbackState', state);
    if (playbackState == State.Playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };
  useEffect(() => {
    start();
  }, [entries]);
  useEffect(() => {
    setIndex(selected);
  }, [selected, entries]);

  useImperativeHandle(
    ref,
    () => {
      return {
        toggle: () => {
          TogglePlay(playbackState);
        },
        nextTrack: () => {
          next(entries[index + 1] ? index + 1 : index);
        },
        prevTrack: () => {
          next(entries[index - 1] ? index - 1 : 0);
        },
      };
    },
    [playbackState],
  );
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={{uri: entry.album.picture.uri}}
            style={{width: COVER_SIZE, height: COVER_SIZE}}
          />
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 16, textAlign: 'center'}}>
            {entry.track.name}
          </Text>
          <Text style={{textAlign: 'center'}}>{entry.album.artist}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          paddingHorizontal: 10,
          justifyContent: 'space-between',
        }}>
        <Text style={{color: 'black'}}>{timeFormat(progress.position)}</Text>
        <Text style={{color: 'black'}}>{timeFormat(progress.duration)}</Text>
      </View>
      <Slider
        style={{width: width - 20, height: 40}}
        minimumValue={0}
        maximumValue={progress.duration}
        thumbTintColor="#f9c94e"
        minimumTrackTintColor="#f9c94e"
        maximumTrackTintColor="#e4e4e4"
        step={1}
        value={progress.position}
        onSlidingComplete={async val => {
          //  console.log('onSlidingComplete', val);
          //  await TrackPlayer.seekTo(val);
        }}
      />

      <View
        style={{
          height: 40,
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-around',
          marginVertical: 10,
          alignItems: 'center',
        }}>
        <Ionicons
          name="play-skip-back-outline"
          size={24}
          color="#ffcd47"
          onPress={() => {
            next(entries[index - 1] ? index - 1 : 0);
          }}
        />

        {playbackState == 8 || playbackState == State.Connecting ? (
          <View style={styles.button}>
            <ActivityIndicator size="large" color="#1e232e" />
          </View>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              TogglePlay(playbackState);
            }}>
            {playbackState == State.Playing ? (
              <Ionicons
                style={{marginLeft: 0}}
                name="pause"
                size={30}
                color="#1e232e"
              />
            ) : (
              <Ionicons
                name="play"
                size={30}
                style={{marginLeft: 5}}
                color="#1e232e"
              />
            )}
          </TouchableOpacity>
        )}
        <Ionicons
          name="play-skip-forward-outline"
          size={24}
          color="#ffcd47"
          onPress={() => {
            next(entries[index + 1] ? index + 1 : index);
          }}
        />
      </View>
    </View>
  );
});
const Player = ({navigation}) => {
  const {entries, selected} = useParams();
  const {setCurrentMenu, setCurrentRoute, playerRef} = useContext(Context);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      console.log('blur screen');
      TrackPlayer.reset();
    });

    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    //  TrackPlayer.reset();

    setCurrentMenu(entries);

    setCurrentRoute('Player');
  }, [navigation]);

  return (
    <PlayerComponent entries={entries} selected={selected} ref={playerRef} />
  );
};

export default Player;

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    backgroundColor: '#ffcd47',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
