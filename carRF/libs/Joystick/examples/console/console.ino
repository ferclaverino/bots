#include "Joystick.h"

Joystick joystick(A0, A1);

void setup() {
  Serial.begin(9600);
}

// the loop routine runs over and over again forever:
void loop() {
	if (joystick.available()) {
    	Serial.print(joystick.getX());
    	Serial.print(F(" , "));
    	Serial.println(joystick.getY());
	}
  	delay(100);        // delay in between reads for stability
}