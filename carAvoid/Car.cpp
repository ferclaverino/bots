#include "Arduino.h"
#include <Wire.h>
#include <Adafruit_MotorShield.h>
#include "utility/Adafruit_MS_PWMServoDriver.h"
#include "Car.h"

Car::Car(int motorLPin, int motorRPin) {
  _AFMS = Adafruit_MotorShield();
  _motorL = _AFMS.getMotor(motorLPin);
  _motorR = _AFMS.getMotor(motorRPin);
}

void Car::begin() {
  _AFMS.begin();
}

void Car::setSpeed(float speed) {
  if (speed > 1) {
    _speed = 1;
  } else {
    _speed = speed;
  }
}

void Car::forward() {
  setSpeedL(_speed);
  setSpeedR(_speed);
}

void Car::backward() {
  setSpeedL(_speed * -1);
  setSpeedR(_speed * -1);
}

void Car::turnLeft() {
  float turnSpeed = _speed * 1;
  setSpeedL(turnSpeed);
  setSpeedR(turnSpeed * -1);
}

void Car::stop() {
  setSpeedL(0);
  setSpeedR(0);
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
