document.addEventListener('DOMContentLoaded', function () {

  // Exercise 1 - Layout the board
  // Grab every square div inside #board and give it the "square" class
  // so the CSS (grid cell size, border, shadow, etc.) applies to it.
  var board = document.getElementById('board');
  var squares = board.querySelectorAll('div');
  var statusDiv = document.getElementById('status');
  var newGameBtn = document.querySelector('.btn');

  var originalStatusMessage = statusDiv.textContent;

  // Game state: '' = empty, 'X' or 'O' once played
  var gameState = [];
  var currentPlayer = 'X';
  var gameWon = false;

  // All possible winning combinations, by square index (0-8)
  var winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  squares.forEach(function (square, index) {
    square.classList.add('square');
    gameState[index] = '';

    // Exercise 3 - Hover effect
    square.addEventListener('mouseover', function () {
      if (gameState[index] === '' && !gameWon) {
        square.classList.add('hover');
      }
    });

    square.addEventListener('mouseout', function () {
      square.classList.remove('hover');
    });

    // Exercise 2 - Add X or O on click
    // Exercise 6 - Disallow cheating (ignore clicks on filled squares or after a win)
    square.addEventListener('click', function () {
      if (gameState[index] !== '' || gameWon) {
        return;
      }

      gameState[index] = currentPlayer;
      square.textContent = currentPlayer;
      square.classList.add(currentPlayer);
      square.classList.remove('hover');

      // Exercise 4 - Check for a winner
      if (checkWinner(currentPlayer)) {
        statusDiv.textContent = 'Congratulations! ' + currentPlayer + ' is the Winner!';
        statusDiv.classList.add('you-won');
        gameWon = true;
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    });
  });

  function checkWinner(player) {
    return winningCombos.some(function (combo) {
      return combo.every(function (index) {
        return gameState[index] === player;
      });
    });
  }

  // Exercise 5 - Restart the game
  newGameBtn.addEventListener('click', function () {
    squares.forEach(function (square, index) {
      gameState[index] = '';
      square.textContent = '';
      square.classList.remove('X', 'O', 'hover');
    });

    statusDiv.textContent = originalStatusMessage;
    statusDiv.classList.remove('you-won');
    currentPlayer = 'X';
    gameWon = false;
  });

});
