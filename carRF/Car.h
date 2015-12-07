#ifndef Car_h
#define Car_h

#include "Arduino.h"
#include <Wire.h>
#include <Adafruit_MotorShield.h>
#include "utility/Adafruit_PWMServoDriver.h"

class Car
{
  public:
    Car(int motorLPin, int motorRPin);
    void begin();
    void setDirection(float angle);
    void setForce(float force);
    void setSpeedL(float speed);
    void setSpeedR(float speed);
  private:
    Adafruit_MotorShield _AFMS;
    Adafruit_DCMotor *_motorL;
    Adafruit_DCMotor *_motorR;
    float _force;
    int _maxMotorSpeed = 255;
};

#endif
