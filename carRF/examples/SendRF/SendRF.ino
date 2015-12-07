#include "RadioFrequency.h"

RadioFrequency radioFrequency(1, 7, 8);
commandStruct command;

void setup() {
  Serial.begin(9600);
  radioFrequency.begin();
}

void loop() {

	Serial.println(F("Now sending"));

	command.x = 10;
	command.y = 20;

	if (!radioFrequency.write(command) ) {
    Serial.println(F("failed"));
  }

	delay(1000);
}
