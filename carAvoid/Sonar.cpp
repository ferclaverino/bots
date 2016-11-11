#include <NewPing.h>
#include "Sonar.h"

Sonar::Sonar(int trigerPin, int echoPin, int maxDistance) : _sonar(trigerPin, echoPin, maxDistance) {
}

int Sonar::getDistanceInCm() {
  return _sonar.ping_cm();
}
