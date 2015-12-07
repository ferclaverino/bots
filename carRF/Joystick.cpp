#include "Arduino.h"
#include "math.h"
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

float Joystick::mapToUnit(int value) {
  int mapTo100 = map(value, 0, 1023, -100, 100);
  return (float) mapTo100 / 100.0;
}

float Joystick::readX() {
  return mapToUnit(_xValue);
}

float Joystick::readY() {
  return mapToUnit(_yValue);
}

float Joystick::readAngle() {
  return atan2 (readY(), readX());
}

float Joystick::readForce() {
  float x = readX();
  float y = readY();
  return sqrt(x * x + y * y);
}
