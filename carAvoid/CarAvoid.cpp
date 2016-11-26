#include "Car.h"
#include "CarAvoid.h"
#include "Sonar.h"

CarAvoid::CarAvoid(Car *car, Sonar *sonar) {
  _car = car;
  _sonar = sonar;
}

void CarAvoid::tick() {
  int distance = _sonar->getDistanceInCm();
  int wait = 500;
  Serial.print("distance: ");
  Serial.print(distance);
  Serial.println("cm");

  if (distance > 10) {
    Serial.println("move forward");
    _car->forward();
  } else if (distance != 0) {
    Serial.println("stop");
    _car->stop();
    delay(wait);

    Serial.println("backward");
    _car->backward();
    delay(wait);

    _car->stop();
    delay(wait);

    Serial.println("turnleft");
    _car->turnLeft();
    delay(wait);

    Serial.println("stop");
    _car->stop();
    delay(wait);

    Serial.println("move forward");
    _car->forward();
  }
  delay(100);
}
