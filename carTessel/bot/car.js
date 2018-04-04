'use strict';

class Car {

  constructor(motorL, motorR) {
    this.motorL = motorL;
    this.motorR = motorR;

    // set 80% speed
    this.speed = 255 * 0.8;

    // set 50% speed for turn
    this.turnSpeed = 255 * 0.8;
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
    this.motorL.reverse(this.speed);
    this.motorR.forward(this.speed);
  }

  right() {
    this.motorL.forward(this.speed);
    this.motorR.reverse(this.speed);
  }

  stop() {
    this.motorL.stop();
    this.motorR.stop();
  }

  setSpeed(speed) {
    this.speed = 255 * speed / 100;
  }
}

module.exports = Car;
