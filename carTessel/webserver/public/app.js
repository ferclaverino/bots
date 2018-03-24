$(document).bind('pageinit', init);

function init() {
  $('.led-button').bind('click', toggleLed);
  $('.car-button').bind('vmousedown', moveCar);
  $('.car-button').bind('vmouseup', stopCar);
}

function toggleLed (event) {
  var button = event.target;
  var ledIndex = button.getAttribute('data-led'); // The index of the led in the Tessel.led array
  var statusNode = button.parentNode.querySelector('.led-status'); // The sibling status <span> to update

  fetch('/leds/' + ledIndex)
     .then((response) => response.json())
     .then((response) => {
       statusNode.textContent = response.on ? 'ON' : 'OFF';
     }).catch((e) => {
       console.log('Error', e); // If something went wrong, log that event to the console.
     });;
}

function moveCar (event) {
  var button = event.target;
  var direction = button.getAttribute('data-direction');
  fetch('/car/' + direction);
}

function stopCar() {
  fetch('/car/stop');
}
