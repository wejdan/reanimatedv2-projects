export const pawnMoves = (row, col, player, pieces, otherPieces, isMoved) => {
  'worklet';
  const tmpArry = [];
  const limit = player == 'black' ? row < 7 : row > 0;
  if (limit) {
    const newRow = player == 'black' ? row + 1 : row - 1;
    const secondStep = player == 'black' ? row + 2 : row - 2;

    const forward = newRow + '*' + `${col}`;
    const left = newRow + '*' + `${col - 1}`;
    const right = newRow + '*' + `${col + 1}`;
    const doubleDorward = secondStep + '*' + `${col}`;

    if (!pieces.includes(forward) && !otherPieces.includes(forward)) {
      tmpArry.push(forward);
      if (!isMoved) {
        if (
          !pieces.includes(doubleDorward) &&
          !otherPieces.includes(doubleDorward)
        ) {
          tmpArry.push(doubleDorward);
        }
      }
    }
    if (otherPieces.includes(left)) {
      tmpArry.push(left);
    }
    if (otherPieces.includes(right)) {
      tmpArry.push(right);
    }
  }
  return tmpArry;
};

export const kingMoves = (row, col, pieces) => {
  'worklet';
  const tmpArry = [];

  if (col < 7) {
    const k = row + '*' + `${col + 1}`;
    if (!pieces.includes(k)) {
      tmpArry.push(k);
    }
  }
  if (col > 0) {
    const k = row + '*' + `${col - 1}`;
    if (!pieces.includes(k)) {
      tmpArry.push(k);
    }
  }
  if (row < 7) {
    const newRow = row + 1;
    const k = newRow + '*' + `${col}`;
    const k2 = newRow + '*' + `${col + 1}`;
    const k3 = newRow + '*' + `${col - 1}`;
    if (!pieces.includes(k)) {
      tmpArry.push(k);
    }
    if (!pieces.includes(k2)) {
      tmpArry.push(k2);
    }
    if (!pieces.includes(k3)) {
      tmpArry.push(k3);
    }
  }
  if (row > 0) {
    const newRow = row - 1;
    const k = newRow + '*' + `${col}`;
    const k2 = newRow + '*' + `${col + 1}`;
    const k3 = newRow + '*' + `${col - 1}`;

    if (!pieces.includes(k)) {
      tmpArry.push(k);
    }
    if (!pieces.includes(k2)) {
      tmpArry.push(k2);
    }
    if (!pieces.includes(k3)) {
      tmpArry.push(k3);
    }
  }
  return tmpArry;
};
const isPossibleMove = (pieces, otherPieces, postion) => {
  if (pieces.includes(postion)) {
    return 0;
  }
  if (otherPieces.includes(postion)) {
    return 1;
  }
  return 2;
};
const rockLine = (row, col, pieces, otherPieces, isCol, isBack) => {
  const tmpArry = [];
  for (
    let index = isCol ? col : row;
    isBack ? index > 0 : index < 7;
    isBack ? index-- : index++
  ) {
    const newPos = isBack ? index - 1 : index + 1;
    const postion = isCol ? row + '*' + `${newPos}` : newPos + '*' + `${col}`;
    const result = isPossibleMove(pieces, otherPieces, postion);
    if (result == 0) {
      break;
    }
    if (result == 1) {
      tmpArry.push(postion);

      break;
    }
    tmpArry.push(postion);
  }
  console.log('newPos', tmpArry);

  return tmpArry;
};
export const rockMoves = (row, col, pieces, otherPieces) => {
  'worklet';
  const a = rockLine(row, col, pieces, otherPieces, true, true);
  const b = rockLine(row, col, pieces, otherPieces, true, false);

  const c = rockLine(row, col, pieces, otherPieces, false, true);

  const d = rockLine(row, col, pieces, otherPieces, false, false);

  return [...a, ...b, ...c, ...d];
};

export const knightMoves = (row, col, pieces) => {
  'worklet';
  const tmpArry = [];

  // //   isBlocked();
  const p1 = row - 2 + '*' + `${col + 1}`;
  const p2 = row - 2 + '*' + `${col - 1}`;
  const p3 = row - 1 + '*' + `${col + 2}`;
  const p4 = row - 1 + '*' + `${col - 2}`;

  const p5 = row + 2 + '*' + `${col + 1}`;
  const p6 = row + 2 + '*' + `${col - 1}`;
  const p7 = row + 1 + '*' + `${col + 2}`;
  const p8 = row + 1 + '*' + `${col - 2}`;

  if (!pieces.includes(p1) && row - 2 > -1 && col + 1 < 8) {
    tmpArry.push(p1);
  }
  if (!pieces.includes(p2) && row - 2 > -1 && col > 0) {
    tmpArry.push(p2);
  }
  if (!pieces.includes(p3) && row - 1 > -1 && col + 2 < 8) {
    tmpArry.push(p3);
  }
  if (!pieces.includes(p4) && row - 1 > -1 && col - 2 > -1) {
    tmpArry.push(p4);
  }

  if (!pieces.includes(p5) && row + 2 < 8 && col + 1 < 8) {
    tmpArry.push(p5);
  }
  if (!pieces.includes(p6) && row + 2 < 8 && col - 1 > -1) {
    tmpArry.push(p6);
  }
  if (!pieces.includes(p7) && row + 1 < 8 && col + 2 < 8) {
    tmpArry.push(p7);
  }
  if (!pieces.includes(p8) && row + 1 < 8 && col - 2 > -1) {
    tmpArry.push(p8);
  }
  //   console.log('rock=', tmpArry);
  return tmpArry;
};

const bishopLine = (row, col, pieces, otherPieces, isBack, isLeft) => {
  const tmpArry = [];
  // console.log(pieces);
  let counter = 1;

  for (
    let index = isBack ? row : 1;
    isBack ? index < 7 : index <= row;
    index++
  ) {
    const newRow = isBack ? 1 + index : row - index;

    const postion =
      isBack == false
        ? isLeft
          ? newRow + '*' + `${col + index}`
          : newRow + '*' + `${col - index}`
        : isLeft
        ? newRow + '*' + `${col + counter}`
        : newRow + '*' + `${col - counter}`;
    const result = isPossibleMove(pieces, otherPieces, postion);

    if (result == 0) {
      break;
    }
    if (result == 1) {
      tmpArry.push(postion);

      break;
    }
    tmpArry.push(postion);
    counter = counter + 1;
  }
  return tmpArry;
};
export const bishopMoves = (row, col, pieces, otherPieces) => {
  'worklet';
  const a = bishopLine(row, col, pieces, otherPieces, false, true);
  const b = bishopLine(row, col, pieces, otherPieces, false, false);
  const c = bishopLine(row, col, pieces, otherPieces, true, true);
  const d = bishopLine(row, col, pieces, otherPieces, true, false);
  //row 4,col 5
  return [...a, ...b, ...c, ...d];
};
export const getPlayerPieces = (current, board) => {
  const myPieces = [];
  const otherPieces = [];
  let otherKing = '';
  board.map((p, i) => {
    if (
      p.player == current.player &&
      p.name != current.name &&
      p.isDeleted == false
    ) {
      myPieces.push(p.pos);
    } else if (p.player != current.player && p.isDeleted == false) {
      otherPieces.push(p.pos);
      if (p.type == 'king') {
        otherKing = p.pos;
      }
    }
  });

  return [myPieces, otherPieces, otherKing];
};
export const calculateMovs = (r, c, current, board, isCheckingCheckMate) => {
  'worklet';
  const row = Number(r);
  const col = Number(c);
  const [pieces, otherPieces, otherKing] = getPlayerPieces(current, board);
  let tmpMovs = [];
  if (current.type == 'pawn') {
    tmpMovs = pawnMoves(
      row,
      col,
      current.player,
      pieces,
      otherPieces,
      current.moved,
    );
  } else if (current.type == 'rock') {
    tmpMovs = rockMoves(row, col, pieces, otherPieces);
  } else if (current.type == 'bishop') {
    tmpMovs = bishopMoves(row, col, pieces, otherPieces);
  } else if (current.type == 'queen') {
    const ms = rockMoves(row, col, pieces, otherPieces);
    const ms2 = bishopMoves(row, col, pieces, otherPieces);

    tmpMovs = [...ms, ...ms2];
  } else if (current.type == 'king') {
    tmpMovs = kingMoves(row, col, pieces);
  } else if (current.type == 'knight') {
    tmpMovs = knightMoves(row, col, pieces);
  }
  if (isCheckingCheckMate) {
    const isCheck = false;

    if (tmpMovs.includes(otherKing)) {
      return true;
    } else {
      return false;
    }
  }
  return tmpMovs;
};
