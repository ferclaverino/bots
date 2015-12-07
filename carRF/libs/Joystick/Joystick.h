#ifndef Joystick_h
#define Joystick_h

#include "Arduino.h"

class Joystick
{
  public:
    Joystick(int xPin, int yPin, int delta);
    bool available();
    int readX();
    int readY();
  private:
    int _xPin;
    int _yPin;
    int _delta;
    int _xValue = 0;
    int _yValue = 0;
    bool inDelta(int value1, int value2);
};

#endif