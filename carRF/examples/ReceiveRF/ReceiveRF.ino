#include "RadioFrequency.h"

RadioFrequency radioFrequency(0, 7, 8);
commandStruct command;

void setup() {
  Serial.begin(9600);
  radioFrequency.begin();
}


void loop() {
  if( radioFrequency.available()) {
    radioFrequency.read(&command);

    Serial.print(F("Sent response "));
    Serial.print(command.x);
    Serial.print(F(" , "));
    Serial.println(command.y);
  }

  delay(100);
}
