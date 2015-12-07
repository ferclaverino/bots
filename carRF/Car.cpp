#include "Arduino.h"
#include <Wire.h>
#include <Adafruit_MotorShield.h>
#include "utility/Adafruit_PWMServoDriver.h"
#include "Car.h"

Car::Car(int motorLPin, int motorRPin) {
  _AFMS = Adafruit_MotorShield();
  _motorL = _AFMS.getMotor(motorLPin);
  _motorR = _AFMS.getMotor(motorRPin);
}

void Car::begin() {
  _AFMS.begin();
  Serial.begin(9600);
}

void Car::setDirection(float angle) {
  float speedL;
  float speedR;
  float delta = HALF_PI / 2;

  if (angle >= 0 && angle <= HALF_PI + delta) {
    speedL = _force * cos(angle * 2);
    speedR = _force;
  } else if (angle >= -HALF_PI - delta && angle <= 0) {
    speedL = _force;
    speedR = _force * cos(angle * 2);
  } else {
    speedL = _force * -1;
    speedR = _force * -1;
  }
  Serial.print(speedL);
  Serial.print(F(" , "));
  Serial.println(speedR);
  setSpeedL(speedL);
  setSpeedR(speedR);
}

void Car::setForce(float force) {
  if (force > 1) {
    force = 1;
  } else {
    _force = force;
  }
}

void Car::setSpeedL(float speed) {
  if (speed > 0) {
    _motorL->run(FORWARD);
    _motorL->setSpeed(_maxMotorSpeed * speed);
  } else {
    _motorL->run(BACKWARD);
    _motorL->setSpeed(_maxMotorSpeed * speed * -1);
  }
}

void Car::setSpeedR(float speed) {
  if (speed > 0) {
    _motorR->run(FORWARD);
    _motorR->setSpeed(_maxMotorSpeed * speed);
  } else {
    _motorR->run(BACKWARD);
    _motorR->setSpeed(_maxMotorSpeed * speed * -1);
  }
}
