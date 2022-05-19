function openPlayerConfig(event) {
  const selectedPlayerId = +event.target.dataset.playerid;
  editedPlayer = selectedPlayerId;
  // When this function is submitted, we now that one of the edit buttons was clicked.
  // now we can get access to that click button through event.
  // dataset property gives access to the "data" attributes of the html elements.
  // plyerid is the name of the data set we need.
  // - are not allowed in dot notations. thats why we dont use - in the middle of playerid.
  // But we can actually use player-id as the name instead of playerid in the html code.
  // but if we named it like that, then the above code should be written like this.
  // const selectedPlayerId = +event.target.dataset["player-id"];
  // So now the value of selectedPlayerId will defer from the edit buttons we click,
  // as we've assigned different values for different data attributes of the different edit buttons.
  // So we can use this value to identify which edit button was clicked.
  // But the default value of a data attribute is a string.
  // so we need to convert that value to a integer.
  // we can do that by adding a + sign in front of the dot notation.
  // So now the value of editedPlayer will change from 0 to 1 or 2.
  playerConfigOverlayElement.style.display = "block";
  backdropElement.style.display = "block";
}

function closePlayerConfig() {
  playerConfigOverlayElement.style.display = "none";
  backdropElement.style.display = "none";
  formElement.firstElementChild.classList.remove("error");
  errorsOutputElement.textContent = "";

  formElement.firstElementChild.lastElementChild.value = "";
  // this will reset "what the user has entered in the input element previously",
  // when we click the edit button again.
  // Without this, the user will see what was written inside the input element previously,
  // when he click the edit button again.
}

function savePlayerConfig(event) {
  event.preventDefault();
  // This is how we stop the default mechanism of a submit button of sending a http request to a server.
  // So now if we click the submit button, the page won't get reloaded.

  const formData = new FormData(event.target);
  // This is actually a object created by us.
  // this is same as creating a object like const formData = {}; this.
  // This is another way of creating such a object by using the "new" keyboard.
  // The we add a build in function called FormData(). This is actually known as a built in blueprint.
  // What we doing here with new FormData() is called instantiating an object based on an object blueprint.
  // FormData is a function that knows how to generate objects that have a certain shape.
  // We can use such blueprints by executing these blueprint functions as functions and adding the "new" keyword in front.
  // FormData is a built-in blueprint that actually takes a form, so a pointer at a form HTML element,
  // and will then automatically extract values entered into inputs in that form for us.
  // We can achieve this by using event.target inside the FormData() function,
  // because event.target points at the HTML element (form element) that was responsible for the event.
  // Now this will automatically look for inputs inside the form.

  // const enteredPlayerName = formData.get("player-name");
  // player-name is the value we've defined on the name attribute of the input element.
  // So that would be the identifier we need to get access to the entered input value.
  // get is a special method that's available on the formData.
  // And this is how we extract information from a form.

  const enteredPlayerName = formData.get("player-name").trim();
  // .get will give us a string because the input element will yield the value as a string.
  // .trim() will trim excess white space.
  // Which means if we have extra white spaces in front or after the name, it will get rid of that.
  // but if we add only white spaces, the trim will erase all of those and gives nothing as a name.
  // even if we add the "required" attribute to the input element, users can still be able to type only white spaces.
  // so we need to find a way to validate that user didn't typed just empty spaces in the input field.

  if (!enteredPlayerName) {
    // This !enteredPlayerName a falsy value because empty string are considered as false in JS.
    // Which means this if statement get executed when only blank spaces are typed inside the input field.
    event.target.firstElementChild.classList.add("error");
    errorsOutputElement.textContent = "Please enter a valid name!";
    return;
    // when you execute return like this, you stop the execution of the function in which you call it.
    // So lines written "below the if statement" won't be executed when this "return" line is executed.
    // So the if statement keeps giving the error message until we type a valid username.
  }

  const updatedPlayerDataElement = document.getElementById(
    "player-" + editedPlayer + "-data"
    // This is actually the real use case of the data attribute we assigned to the html
    // we can use the "value of the data attribute" as a part of the id name of the articles.
    // We can reassign the PLAYER NAME text with the real name entered by the user using the article id.
  );
  updatedPlayerDataElement.children[1].textContent = enteredPlayerName;

  // if (editedPlayer === 1) {
  //  players[0].name = enteredPlayerName;
  // } else {
  //  players[1].name = enteredPlayerName;
  // }
  // This is how we update the name: properties of the objects inside the array.
  // But we can write the above code like the following to.

  players[editedPlayer - 1].name = enteredPlayerName;
  // for player 1, this yield 0.
  // 0 is the first object inside the array.

  // for player 2, this yield 1.
  // 1 is the second object inside the array.

  // so we can access the objects inside the arrays like this.

  closePlayerConfig();
  // we do the closePlayerConfig() function manually inside the savePlayerConfig() function like this.
}
