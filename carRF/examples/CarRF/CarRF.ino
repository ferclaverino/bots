#include "Car.h"
#include "RadioFrequency.h"

Car car(1, 2);
RadioFrequency radioFrequency(0, 7, 8);
commandStruct command;

void setup() {
  car.begin();
  radioFrequency.begin();
  Serial.begin(9600);
}

void loop() {
	if( radioFrequency.available()) {
    radioFrequency.read(&command);

    Serial.print(F("Sent response "));
    Serial.print(command.angle);
    Serial.print(F(" , "));
    Serial.println(command.force);

    car.setForce(command.force);
    car.setDirection(command.angle);
  }

  delay(100);
}
