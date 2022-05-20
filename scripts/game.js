function resetGameStatus() {
  activePlayer = 0;
  currentRound = 1;
  gameIsOver = false;
  gameOverElement.firstElementChild.innerHTML =
    "You won, <span id=\"winner-name\">PLAYER NAME</span>!";
  gameOverElement.style.display = "none";

  let gameBoardIndex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;
      const gameBoardItemElement = gameBoardElement.children[gameBoardIndex];
      gameBoardItemElement.textContent = "";
      gameBoardItemElement.classList.remove("disabled");
      gameBoardIndex++;
    }
    // This is a nested loop.
    // We name our second helper variable as j.
    // Now we are looping through all the items in gameData.
    // So we can reset gameData from here.
    // And we can reset the signs in the Game board from this as well.
  }
}
// This is how we reset the game after the game is over.

function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert("Please set custom player names for both players!");
    return;
    // return code means that the below code won't get executed if the "if statement" get executed.
  }
  // The above code prevents users from starting new games if they haven't provide valid usernames.

  resetGameStatus();

  activePlayerNameElement.textContent = players[activePlayer].name;
  gameAreaElement.style.display = "block";
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerNameElement.textContent = players[activePlayer].name;
}
// This is how we switch the player between "X" and "0".

function selectGameField(event) {
  if (event.target.tagName !== "LI" || gameIsOver) {
    return;
  }
  // tagName shows the items inside the target element.
  // So the tagNames of this target are "LI" and "OL".
  // So the above code prevents the following code from executing if an empty space is clicked
  // instead of the box fields.
  // event is like a "common" term for parents and also the children of the target element.
  // So the event can represent either "OL" or "LI" as it's target elements.
  // That's why we need to prevent event from selecting OL instead of LI like this.
  // This code also prevents users from selecting boxes even after the game is over.
  // It does that if gameIsOver === true.
  // But we can write just "gameIsOver" instead of "gameIsOver === true" as it's a boolean value.
  // The if statements get executed if the boolean values are true.
  // That's why we can just write "gameIsOver" instead of "gameIsOver === true" and expect the same result.

  const selectedField = event.target;

  const selectedColumn = selectedField.dataset.col - 1;
  const selectedRow = selectedField.dataset.row - 1;
  // When we add -1 the dataset is automatically get converted into a number.
  // So we don't need to add the + sign in front.
  // We deduct 1 from here because the array starts from 0, not 1.

  if (gameData[selectedRow][selectedColumn] > 0) {
    alert("Please select an empty field!");
    return;
  }
  // This is how we prevent the users from selecting a box which has already been selected.

  selectedField.textContent = players[activePlayer].symbol;
  // This is how we access the symbol of the players.
  // activePlayer is a variable we use to define the number of the player inside the "players" array.
  // so if activePlayer = 0; then players[activePlayer]; means players[0];
  // So it has chosen the first player (X) on the "players" array.
  // if activePlayer = 1; then players[activePlayer]; means players[1];
  // So it has chosen the second player (0) on the "players" array.
  selectedField.classList.add("disabled");

  gameData[selectedRow][selectedColumn] = activePlayer + 1;
  // This is how we set the selection of the user inside the gameData two dimensional array.
  // We use two brackets here.
  // The first bracket is used to dive into the main array and select the first, second or third array inside it.
  // The second bracket is used to select an "item" in that inner array.
  // So the first bracket is actually the "row" of the gameData array we dive in.
  // The second bracket is the "column" of that row.
  // activePlayer = 0; is the first player and activePlayer = 1; is the second player.
  // But we need to add 1 to the first player and 2 to the second player in the gameData two dimensional array.
  // So that we add + 1 in this code.

  const winnerId = checkForGameOver();

  if (winnerId !== 0) {
    endGame(winnerId);
  }

  currentRound++;
  // This means currentRound = currentRound + 1;
  switchPlayer();
}

function checkForGameOver() {
  // --------------------------------------------------------------------------------------------------------
  // if (gameData[0][0] === 1 && gameData[0][1] === 1 && gameData[0][2] === 1) {
  //   return 1;
  // }
  // if (gameData[0][0] === 2 && gameData[0][1] === 2 && gameData[0][2] === 2) {
  //   return 2;
  // }
  // These are some of the different data combinations that make a winner.
  // But writing the code this way is overwhelming.
  // So we need to find out an easy way of implementing this.

  // ---------------------------------------------------------------------------------------------------------
  // if (
  //  gameData[0][0] > 0 &&
  //  gameData[0][0] === gameData[0][1] &&
  //  gameData[0][1] === gameData[0][2]
  // ) {
  // return gameData[0][0];
  // We can simply use the gameData[0][0] as the return as it is also the winnerId.
  // }
  // This way we can find out whether the entire first row is occupied by a single player or not.
  // We add > 0 at the beginning to make sure that the combination of 0, 0, 0 is not a valid combination.
  // We could only have 1, 1, 1 or 2, 2, 2 instead.

  // if (
  //   gameData[1][0] > 0 &&
  //   gameData[1][0] === gameData[1][1] &&
  //   gameData[1][1] === gameData[1][2]
  // ) {
  //   return gameData[0][0];
  // }

  // if (
  //   gameData[2][0] > 0 &&
  //   gameData[2][0] === gameData[2][1] &&
  //   gameData[2][1] === gameData[2][2]
  // ) {
  //   return gameData[0][0];
  // }

  // -----------------------------------------------------------------------------------------------------------
  // We can shorten even the above code like this.
  // This is how we check the "rows" for equality.
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }

  // This is how we check the "columns" for equality.
  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[0][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }

  // Diagonal: Top left to bottom right
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }

  // Diagonal: Bottom left to top right
  if (
    gameData[2][0] > 0 &&
    gameData[2][0] === gameData[1][1] &&
    gameData[1][1] === gameData[0][2]
  ) {
    return gameData[2][0];
  }

  if (currentRound === 9) {
    return -1;
    // This gives winnerId as -1 if there's no winner after 9 rounds.
    // (There cannot be more than 9 rounds. That's why we implement it here.)
  }
  return 0;
  // This is how we signal that neither of the above has happened.
  // We cannot technically have 0 as the result instead of -1, 1 or 2 but we've added it anyways.
}
// This is how we find out who the winner is.

function endGame(winnerId) {
  gameIsOver = true;
  gameOverElement.style.display = "block";
  // This will show the game over element if the game is over.

  if (winnerId > 0) {
    // winnerId > 0 means that we have a winner.
    const winnerName = players[winnerId - 1].name;
    gameOverElement.firstElementChild.firstElementChild.textContent =
      winnerName;
  } else {
    gameOverElement.firstElementChild.textContent = "It's a draw!";
    // This else code get executed if winnerId = -1
  }
}
