#include "Joystick.h"
#include "RadioFrequency.h"

Joystick joystick(A0, A1, 5);
RadioFrequency radioFrequency(1, 7, 8);
commandStruct command;

void setup() {
  Serial.begin(9600);
  radioFrequency.begin();
}

void loop() {

  if (joystick.available()) {
  	command.x = joystick.readX();
  	command.y = joystick.readY();
  	command.angle = joystick.readAngle();
  	command.force = joystick.readForce();

  	Serial.print(command.angle);
  	Serial.print(F(" , "));
  	Serial.println(command.force);

  	if (!radioFrequency.write(command) ) {
      Serial.println(F("failed"));
    }

	}

	delay(100);

}
