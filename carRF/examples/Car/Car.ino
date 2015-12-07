#include "Car.h"

Car car(1, 2);

void setup() {
  car.begin();
}

void loop() {
	car.setSpeedL(0.5);
  car.setSpeedR(-0.5);
  delay(1000);
  car.setSpeedL(0);
  car.setSpeedR(0);
  delay(1000);
}
