#ifndef Sonar_h
#define Sonar_h

#include <NewPing.h>

class Sonar
{
  public:
    Sonar(int trigerPin, int echoPin, int maxDistance);
    int getDistanceInCm();

  private:
    NewPing _sonar;
};

#endif
