function openPlayerConfig() {
  playerConfigOverlayElement.style.display = "block";
  backdropElement.style.display = "block";
}

function closePlayerConfig() {
  playerConfigOverlayElement.style.display = "none";
  backdropElement.style.display = "none";
  formElement.firstElementChild.classList.remove("error");
  errorsOutputElement.textContent = "";
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
}
