import { HEIGHT, LENGTH } from './Parameters'

function checkLine(board, tx, ty) {
  const color = board[tx][ty]
  var cpt = 1, i = 1
  while ((ty - i >= 0) && (board[tx][ty - i] === color)) {
    cpt++
    i++
  }
  i = 1
  while ((ty + i < LENGTH) && (board[tx][ty + i] === color)) {
    cpt++
    i++
  }
  return (cpt >= 4)
}

function checkColumn(board, tx, ty) {
  const color = board[tx][ty]
  var cpt = 1, i = 1
  while ((tx + i < HEIGHT) && (board[tx + i][ty] === color)) {
    cpt++
    i++
  }
  return (cpt >= 4)
}

function checkUpward(board, tx, ty) {
  const color = board[tx][ty]
  var cpt = 1, i = 1
  while ((tx + i < HEIGHT) && ((ty - i >= 0) && board[tx + i][ty - i] === color)) {
    cpt++
    i++
  }
  i = 1
  while ((tx - i >= 0) && ((ty + i < LENGTH) && board[tx - i][ty + i] === color)) {
    cpt++
    i++
  }
  return (cpt >= 4)
}

function checkDownward(board, tx, ty) {
  const color = board[tx][ty]
  var cpt = 1, i = 1
  while ((tx - i >= 0) && ((ty - i >= 0) && board[tx - i][ty - i] === color)) {
    cpt++
    i++
  }
  i = 1
  while ((tx + i < HEIGHT) && ((ty + i < LENGTH) && board[tx + i][ty + i] === color)) {
    cpt++
    i++
  }
  return (cpt >= 4)
}

function isWinning(currenBoard, tx, ty) {
  let board = [];
  for (let i = 0; i < HEIGHT; i++) {
    board.push(currenBoard.slice(0 + i * LENGTH, LENGTH + i * LENGTH))
  }
  if (checkLine(board, tx, ty) ||
    checkColumn(board, tx, ty) ||
    checkUpward(board, tx, ty) ||
    checkDownward(board, tx, ty))
    return true
}

function isFull(e) {
  return (e !== '')
}

export default function getNewBoard(column, player, board) {
  const newBoard = board.map((x) => x)
  for (let row = 5; row >= 0; row--) {
    if ('' === board[column + (LENGTH * row)]) {
      newBoard[column + (LENGTH * row)] = player ? 'yellowColor' : 'redColor'
      if (isWinning(newBoard, row, column)) {
        return { newBoard, 'gameState': 'isWin' }
      }
      if (newBoard.every(isFull)) {
        return { newBoard, 'gameState': 'isDraw' }
      }
      break
    }
  }
  return { newBoard, 'gameState': 'isGoing' }
}
