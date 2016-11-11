#include "Car.h"
#include "CarAvoid.h"
#include "Sonar.h"

Car car(1, 2);
Sonar sonar(12, 11, 200);
CarAvoid carAvoid(&car, &sonar);

void setup() {
  Serial.begin(9600);  
  car.begin();
  car.setSpeed(0.5);
}

void loop() {
  testAvoid();
}

void testAvoid() {
  carAvoid.tick();
}

void testSonar() {
  delay(100);
  Serial.print("Ping: ");
  Serial.print(sonar.getDistanceInCm());
  Serial.println("cm");
}

void testCar() {
  car.setSpeedL(0.5);
  car.setSpeedR(-0.5);
  delay(1000);
  car.setSpeedL(0);
  car.setSpeedR(0);
  delay(1000);
}

