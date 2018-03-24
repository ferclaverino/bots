'use strict';

class Car {

  constructor(motorL, motorR) {
    this.motorL = motorL;
    this.motorR = motorR;

    // set 80% speed
    this.speed = 255 * 0.8;

    // set 50% speed for turn
    this.turnSpeed = 255 * 0.5;
  }

  forward() {
    this.motorL.forward(this.speed);
    this.motorR.forward(this.speed);
  }

  reverse() {
    this.motorL.reverse(this.speed);
    this.motorR.reverse(this.speed);
  }

  left() {
    this.motorL.reverse(this.turnSpeed);
    this.motorR.forward(this.turnSpeed);
  }

  right() {
    this.motorL.forward(this.turnSpeed);
    this.motorR.reverse(this.turnSpeed);
  }

  stop() {
    this.motorL.stop();
    this.motorR.stop();
  }

}

module.exports = Car;
