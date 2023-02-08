import React, {createContext, useState, useRef} from 'react';
import {useDerivedValue, useSharedValue} from 'react-native-reanimated';

export const Context = createContext();

export const ContextProvider = ({children}) => {
  const [currentMenu, setCurrentMenu] = useState([]);
  const [currentRoute, setCurrentRoute] = useState(null);
  const playerRef = useRef(null);
  const command = useSharedValue(null);
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

  React.useEffect(() => {
    a.value = 0;
  }, [currentMenu]);

  return (
    <Context.Provider
      value={{
        currentMenu,
        setCurrentMenu,

        currentRoute,
        setCurrentRoute,
        currentIndex,
        playerRef,
        command,
        a,
      }}>
      {children}
    </Context.Provider>
  );
};
