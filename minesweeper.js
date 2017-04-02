document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  cells: []
}

//Sound
var explosion
var applause

//Board-size
var boardSize = 3

function startGame () {
  //Sound
  explosion = document.getElementById('explosion')
  applause = document.getElementById('applause')
  generateBoard(boardSize)

  for(var i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }

  // Don't remove this function call: it makes the game work!
  lib.initBoard()

  document.addEventListener('click', checkForWin)
  document.addEventListener('contextmenu', checkForWin)
  document.getElementById('reset-btn').addEventListener('click', resetGame)
  document.getElementsByClassName('board')[0].addEventListener('click', bombClicked)
  document.getElementById('board-size-buttons').addEventListener('click', function(event) {
    //prevents error when between elements is clicked
    if (event.target.dataset.size) {
      changeBoardSize(event.target.dataset.size)
    }
  })


  // var boardSizeBtn = document.getElementsByClassName('board-size-btn')
  // for (var i = 0; i < boardSizeBtn.length; i++) {
  //   console.log(boardSizeBtn[i])
  //   var size = boardSizeBtn[i].dataset.size
  //   boardSizeBtn[i].addEventListener('click', function() {
  //     console.log(size)
  //     changeBoardSize(size)
  //   })
  // }
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
  applause.play()
  removeListeners()
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
      isMine: Math.random() < 0.2 ? true : false,
      isMarked: false,
      hidden: true
    }
  }

//Checks if the board has any mine. If none of the cells is a mine, choose a random cell and make it a mine.
  var mineList = board.cells.filter(function(cell) {
    return cell.isMine
  })
  if (mineList.length === 0) {
    board.cells[Math.floor(Math.random() * board.cells.length)].isMine = true;
  }
}

//Restart the game when the reset button is pressed
function resetGame() {
  var oldBoard = document.getElementsByClassName('board')[0]
  oldBoard.innerHTML = ''
  startGame()
}

//Play bomb sound
function bombClicked(event) {
  var cell = event.target
  if (cell.classList.contains('mine')) {
    explosion.play()
  }
}


// Cloning removes event listeners - to be used when the player wins and make the bombs unclickable
function removeListeners () {
  var board = document.getElementsByClassName('board')[0]
  var clone = board.cloneNode(true)
  board.parentNode.replaceChild(clone, board)
}


//Reset Game
function changeBoardSize(size) {
  //prevents error when between elements is clicked
  if (!size) { return }
  var oldBoard = document.getElementsByClassName('board')[0]
  oldBoard.innerHTML = ''
  board = {
    cells: []
  }
  boardSize = size
  startGame()
}
