
export const FULL = '⬤';
export const EMPTY = '◯';

export const HEIGHT = 6
export const LENGTH = 7

let BOARD = [];
let keyTracker = 0;
for (let r = 0; r < HEIGHT; r++) {
  let row = [];
  for (let c = 0; c < LENGTH; c++) {
    row.push(keyTracker)
    keyTracker++;
  }
  BOARD.push(row);
}

let BUTTONS = [];
for (let c = 0; c < LENGTH; c++) {
  BUTTONS.push(c)
}

export { BOARD, BUTTONS }
