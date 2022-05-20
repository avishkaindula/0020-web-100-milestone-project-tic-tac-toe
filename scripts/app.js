const gameData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
// This is a two dimensional array.
// These are arrays inside an array.
// So now we set the different field values to this array whenever a box filed was selected.
// So ultimately, this is where the selections of the user is stored.
// We can replace the 0 with 1 or 2 and then find out who is the winner.
// data-col and data-row are used to set the values in the array. 

let editedPlayer = 0;
// editedPlayer is the value we use to define the value of the edit button pressed.
let activePlayer = 0;

const players = [
  { name: "", symbol: "X" },
  { name: "", symbol: "0" },
];
// These are two objects inside an array.
// We use this array to hold the real names entered by the users internally in the code we write.

const playerConfigOverlayElement = document.getElementById("config-overlay");
const backdropElement = document.getElementById("backdrop");
// even though app.js is linked after config.js, we can still write this constants in app.js.
// It's possible because click event listener occurs "after" the above code lines are being executed.
const formElement = document.querySelector("form");
const errorsOutputElement = document.getElementById("config-errors");
const gameAreaElement = document.getElementById("active-game");
const activePlayerNameElement = document.getElementById("active-player-name");

const editPlayer1BtnElement = document.getElementById("edit-player-1-btn");
const editPlayer2BtnElement = document.getElementById("edit-player-2-btn");
const cancelConfigBtnElement = document.getElementById("cancel-config-button");
const startNewGameBtnElement = document.getElementById("start-game-btn");

// const gameFieldElements = document.querySelectorAll("#game-board li");
// This will select all the li items in the game-board.
// But we can get access to the "ol" and do it another way like this.
const gameBoardElement = document.getElementById("game-board");

editPlayer1BtnElement.addEventListener("click", openPlayerConfig);
// The listener function for this Event listener will be written on the config.js file, not in here.
// This is actually possible in JS without writing any extra code.
// But we need to make sure that we've linked the scripts in the HTML file in the correct order.
// So the script file where the function sits (config.js) should be linked "before" app.js file.
editPlayer2BtnElement.addEventListener("click", openPlayerConfig);

cancelConfigBtnElement.addEventListener("click", closePlayerConfig);
backdropElement.addEventListener("click", closePlayerConfig);
// We can add click event listeners not only to buttons, but also to other elements.
// So if we even click the backdrop, the overlay will disappear.

formElement.addEventListener("submit", savePlayerConfig);
// The default mechanism of a submit button is to send a http request to a server.
// But we need read the value of the form and set the value as the player's name.
// We do it by adding as event to the "form" like this.
// We are adding an event to the "overall form", not to the "submit button".
// But it's actually gives the same result of adding a click event to the submit button.
// So we can either add a click event to the submit button, or add a "submit" event to the overall form.
// the form will automatically identify the type="submit" button as the button associated to
// submit the data entered inside the form.
// Submit is the built in event just like a click event.
// So the savePlayerConfig function will execute when the form is submitted.

startNewGameBtnElement.addEventListener("click", startNewGame);

// for (const gameFieldElement of gameFieldElements) {
//   gameFieldElement.addEventListener("click", selectGameField);
// }
// for of is a loop type used in arrays.
// This loop will add an event listener to every box field clicked by the user.
// We can do the same as above another way like below.
gameBoardElement.addEventListener("click", selectGameField);
// But if we click the gap between the box fields, the program clashes and displays a single "X" mark or "0" mark.
