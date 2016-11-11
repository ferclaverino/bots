#ifndef Car_h
#define Car_h

#include "Arduino.h"
#include <Wire.h>
#include <Adafruit_MotorShield.h>
#include "utility/Adafruit_MS_PWMServoDriver.h"

class Car
{
  public:
    Car(int motorLPin, int motorRPin);
    void begin();
    void setSpeed(float speed);
    void forward();
    void backward();
    void turnLeft();
    void stop();
    void setSpeedL(float speed);
    void setSpeedR(float speed);
  private:
    Adafruit_MotorShield _AFMS;
    Adafruit_DCMotor *_motorL;
    Adafruit_DCMotor *_motorR;
    float _speed;
    int _maxMotorSpeed = 255;
};

#endif
