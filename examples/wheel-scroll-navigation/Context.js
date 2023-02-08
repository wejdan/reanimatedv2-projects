import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
} from 'react';
import {PermissionsAndroid} from 'react-native';
import {useDerivedValue, useSharedValue} from 'react-native-reanimated';
import TrackPlayer, {
  State,
  Event,
  Capability,
  usePlaybackState,
  useProgress,
  RepeatMode,
  useTrackPlayerEvents,
} from 'react-native-track-player';
export const Context = createContext();

export const ContextProvider = ({children}) => {
  const [currentMenu, setCurrentMenu] = useState([]);

  const [currentRoute, setCurrentRoute] = useState(null);
  const playerRef = useRef(null);
  const a = useSharedValue(0);
  const currentIndex = useDerivedValue(() => {
    const i =
      currentMenu.length == 0
        ? 0
        : Math.min(
            Math.floor((a.value / 360) * currentMenu.length),
            currentMenu.length - 1,
          );
    return i;
  });
  const isPicking = useSharedValue(false);
  React.useEffect(() => {
    a.value = 0;
  }, [currentMenu]);

  return (
    <Context.Provider
      value={{
        currentMenu,
        setCurrentMenu,
        isPicking,

        currentRoute,
        setCurrentRoute,
        currentIndex,
        playerRef,
        a,
      }}>
      {children}
    </Context.Provider>
  );
};
