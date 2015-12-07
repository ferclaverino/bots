#ifndef RadioFrequency_h
#define RadioFrequency_h

#include "Arduino.h"
#include <SPI.h>
#include "RF24.h"

struct commandStruct {
  float x;
  float y;
  float angle;
  float force;  
};

class RadioFrequency
{
  public:
    RadioFrequency(bool radioNumber, int cePin, int csnPin);
    void begin();
    bool write(commandStruct data);
    bool available();
    void read(commandStruct *data);
  private:
    byte _addresses[2][6] = {"1Node","2Node"};
    bool _radioNumber;
    RF24 _radio;
};

#endif
