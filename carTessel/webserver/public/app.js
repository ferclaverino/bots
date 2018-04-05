$(document).bind('pageinit', init);

function init() {
  $('.led-button').bind('click', toggleLed);
  $('.car-button').bind('vmousedown', moveCar);
  $('.car-button').bind('vmouseup', stopCar);
  $('#speed').bind('change', setSeed);
  $('#picture button').bind('click', capture);
}

function toggleLed (event) {
  var button = event.target;
  var ledIndex = button.getAttribute('data-led'); // The index of the led in the Tessel.led array
  var statusNode = button.parentNode.querySelector('.led-status'); // The sibling status <span> to update

  fetch('/leds/' + ledIndex)
    .then((response) => response.json())
    .then((response) => {
      statusNode.textContent = response.on ? 'ON' : 'OFF';
    });
}

function moveCar (event) {
  var button = event.target;
  var direction = button.getAttribute('data-direction');
  fetch('/move/' + direction);
}

function stopCar() {
  fetch('/move/stop');
}

function setSeed (event) {
  var speed = $(event.target).val();
  fetch('/speed/' + speed);
}

function capture (event) {
  $("#picture img").attr("src", "/capture?timestamp=" + new Date().getTime());
}
