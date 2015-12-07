#include "Joystick.h"

Joystick joystick(A0, A1, 10);

void setup() {
  Serial.begin(9600);
}

void loop() {
	if (joystick.available()) {
    Serial.print(joystick.readAngle() );
    Serial.print(F(" , "));
    Serial.print(joystick.readForce() );
    Serial.print(F(" - "));
  	Serial.print(joystick.readX());
  	Serial.print(F(" , "));
  	Serial.println(joystick.readY());
	}
  
  delay(100);
}
