document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  cells: []
}

function startGame () {
  generateBoard(6)

  for(var i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }

  // Don't remove this function call: it makes the game work!
  lib.initBoard()

  document.addEventListener('click', checkForWin)
  document.addEventListener('contextmenu', checkForWin)
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  for (var i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine && !board.cells[i].isMarked) {
      return
    } else if (!board.cells[i].isMine && board.cells[i].hidden) {
      return
    }
  }
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')
  lib.displayMessage('You win!')
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`:
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  var surrounding = lib.getSurroundingCells(cell.row, cell.col)
  var count = 0
  for (var i = 0; i < surrounding.length; i++) {
    if (surrounding[i].isMine) {
      count += 1
    }
  }
  return count
}

// Customisation begins here!! Woop woop!!-----------------------

//Generates cells
function generateBoard(rowColSize) {
  for (var i = 0; i < rowColSize * rowColSize; i++) {
    board.cells[i] = {
      row: Math.floor(i / rowColSize),
      col: i % rowColSize,
      isMine: Math.random() < 0.33 ? true : false,
      isMarked: false,
      hidden: true
    }
  }

  var mineList = board.cells.filter(function(cell) {
    return cell.isMine
  })
  if (mineList.length === 0) {
    board.cells[Math.floor(Math.random() * board.cells.length)].isMine = true;
  }
}
