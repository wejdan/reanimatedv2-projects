import React, {createContext, useState} from 'react';
import {
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {runOnJS} from 'react-native-reanimated/lib/reanimated2/core';

export const Context = createContext();
const names = ['r1', 'n1', 'b1', 'q', 'k', 'b2', 'n2', 'r2'];
const types = [
  'rock',
  'knight',
  'bishop',
  'queen',
  'king',
  'bishop',
  'knight',
  'rock',
];

const p = [];

for (let row = 0; row < 8; row++) {
  for (let col = 0; col < 8; col++) {
    const key = `${row}` + '*' + `${col}`;

    if (row == 0) {
      p.push({
        name: 'b' + names[col],
        pos: key,
        player: 'black',
        isDeleted: false,
        type: types[col],
      });
    } else if (row == 1) {
      p.push({
        name: 'b' + 'p' + col,
        pos: key,
        player: 'black',
        isDeleted: false,
        type: 'pawn',
      });
    } else if (row == 6) {
      p.push({
        name: 'w' + 'p' + col,
        pos: key,
        player: 'white',
        isDeleted: false,
        type: 'pawn',
      });
    } else if (row == 7) {
      p.push({
        name: 'w' + names[col],
        pos: key,
        player: 'white',
        isDeleted: false,
        type: types[col],
      });
    }
  }
}
export const ContextProvider = ({children}) => {
  const board = useSharedValue(p);
  const turn = useSharedValue('black');
  const rotate = useDerivedValue(() => {
    if (turn.value == 'black') {
      return withTiming(180);
    } else {
      return withTiming(0);
    }
  });
  const active = useSharedValue(null);
  const history = useSharedValue([]);
  const forward = useSharedValue([]);
  const [isCheckMate, setIsCheckMate] = useState(false);
  const [movs, setMovs] = useState([]);
  useAnimatedReaction(
    () => {
      return turn.value;
    },
    data => {
      if (movs != []) {
        runOnJS(setMovs)([]);
      }

      //   runOnJS(setIsDeleted)(true);
    },
    [],
  );
  const init = () => {
    turn.value = 'black';

    board.value = p;
    history.value = [];
    setMovs([]);
  };
  const goBack = () => {
    if (history.value.length == 0) {
      return;
    }
    turn.value = turn.value == 'black' ? 'white' : 'black';
    const oldHistory = [...history.value];
    const forwardList = [...forward.value];

    const step = oldHistory.pop();
    forwardList.push({board: board.value, isCheck: isCheckMate});
    forward.value = forwardList;
    history.value = oldHistory;

    board.value = step.board;
    setIsCheckMate(step.isCheck);
  };
  const goForward = () => {
    if (forward.value.length == 0) {
      return;
    }

    turn.value = turn.value == 'black' ? 'white' : 'black';

    const oldHistory = [...history.value];
    const forwardList = [...forward.value];

    const step = forwardList.pop();

    oldHistory.push({board: board.value, isCheck: isCheckMate});
    forward.value = forwardList;
    history.value = oldHistory;

    board.value = step.board;
    setIsCheckMate(step.isCheck);
    //  console.log('step:', step);
  };
  return (
    <Context.Provider
      value={{
        init,
        goBack,
        goForward,
        board,
        history,
        forward,
        turn,
        active,
        movs,
        setMovs,
        rotate,
        isCheckMate,
        setIsCheckMate,
      }}>
      {children}
    </Context.Provider>
  );
};
