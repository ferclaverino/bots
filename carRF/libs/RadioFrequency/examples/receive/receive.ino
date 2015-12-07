#include "RadioFrequency.h"

RadioFrequency radioFrequency(0, 7, 8);
dataStruct myData;

void setup() {

  Serial.begin(115200);  
  radioFrequency.begin();
}


void loop() {
    
  if( radioFrequency.available()) {
     
    radioFrequency.read(&myData);
    
    Serial.print(F("Sent response "));
    Serial.print(myData.x);
    Serial.print(F(" , "));
    Serial.println(myData.y);
    
  }
} // Loop