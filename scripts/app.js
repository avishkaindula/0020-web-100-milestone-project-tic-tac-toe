const playerConfigOverlayElement = document.getElementById("config-overlay");
const backdropElement = document.getElementById("backdrop");
// even though app.js is linked after config.js, we can still write this constants in app.js.
// It's possible because click event listener occurs "after" the above code lines are being executed.

const editPlayer1BtnElement = document.getElementById("edit-player-1-btn");
const editPlayer2BtnElement = document.getElementById("edit-player-2-btn");
const cancelConfigBtnElement = document.getElementById("cancel-config-button");

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