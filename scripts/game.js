function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert("Please set custom player names for both players!");
    return;
    // return code means that the below code won't get executed if the "if statement" get executed.
  }
  // The above code prevents users from starting new games if they haven't provide valid usernames.
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
  if (event.target.tagName !== "LI") {
    return;
  }
  // tagName shows the items inside the target element.
  // So the tagNames of this target are "LI" and "OL".
  // So the above code prevents the following code from executing if an empty space is clicked
  // instead of the box fields.
  // event is like a "common" term for parents and also the children of the target element.
  // So the event can represent either "OL" or "LI" as it's target elements.
  // That's why we need to prevent event from selecting OL instead of LI like this.

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

  console.log(gameData);

  switchPlayer();
}
