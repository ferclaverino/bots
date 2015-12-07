#include "Arduino.h"
#include "Joystick.h"

Joystick::Joystick(int xPin, int yPin, int delta)
{
  _xPin = xPin;
  _yPin = yPin;
  _delta = delta;
}

bool Joystick::inDelta(int value1, int value2) {
  if (value1 > value2) {
    return (value1 - value2 < _delta);
  } else {
    return (value2 - value1 < _delta);   
  }
}

bool Joystick::available() {
  bool isAvailable = false;
  int x = analogRead(_xPin);;
  int y = analogRead(_yPin);

  if (!inDelta(x, _xValue)) {
    _xValue = x;
    isAvailable = true;
  }

  if (!inDelta(y, _yValue)) {
    _yValue = y;
    isAvailable = true;
  }

  return isAvailable;
}

int Joystick::readX() {
  return _xValue;
}

int Joystick::readY() {
  return _yValue;
}