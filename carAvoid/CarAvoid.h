#ifndef CarAvoid_h
#define CarAvoid_h

#include "Car.h"
#include "Sonar.h"

class CarAvoid
{
  public:
    CarAvoid(Car *car, Sonar *sonar);
    void tick();
  private:
    Car *_car;
    Sonar *_sonar;
};

#endif
