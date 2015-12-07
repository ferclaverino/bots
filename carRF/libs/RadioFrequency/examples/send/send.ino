#include "RadioFrequency.h"

RadioFrequency radioFrequency(1, 7, 8);
dataStruct myData;

void setup() {

  Serial.begin(115200);  
  radioFrequency.begin();
}


void loop() {
    
	Serial.println(F("Now sending"));

	myData.x = 10;
	myData.y = 20;

	if (!radioFrequency.write(myData) ){
   		Serial.println(F("failed"));
 	}
    
	// Try again 1s later
	delay(1000);

} // Loop
