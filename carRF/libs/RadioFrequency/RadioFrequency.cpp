
#include "Arduino.h"
#include <SPI.h>
#include "RF24.h"
#include "RadioFrequency.h"

RadioFrequency::RadioFrequency(bool radioNumber, int cePin, int csnPin) : _radio(cePin,csnPin)
{
  _radioNumber = radioNumber;
}

void RadioFrequency::begin() {
  _radio.begin();
  
  // Set the PA Level low to prevent power supply related issues since this is a
  // getting_started sketch, and the likelihood of close proximity of the devices. RF24_PA_MAX is default.
  _radio.setPALevel(RF24_PA_LOW);
  
  // Open a writing and reading pipe on each radio, with opposite addresses
  if(_radioNumber){
    _radio.openWritingPipe(_addresses[1]);
    _radio.openReadingPipe(1,_addresses[0]);
  }else{
    _radio.openWritingPipe(_addresses[0]);
    _radio.openReadingPipe(1,_addresses[1]);
  }
    
}

bool RadioFrequency::write(dataStruct data) {
  _radio.stopListening();
  return _radio.write( &data, sizeof(data) );
}

bool RadioFrequency::available() {
  _radio.startListening();
  return _radio.available();
}

void RadioFrequency::read(dataStruct *data) {
  _radio.read( data, sizeof(*data) );
}