function DeltaModel(e, f, re, rf) {

  // Calculates angle theta1 (for YZ-pane)
  function calcAngleYZ(x0, y0, z0) {
    var y1 = -0.5 * 0.57735 * f; // f/2 * tan(30 degrees)
    y0 -= 0.5 * 0.57735 * e; // Shift center to edge of effector

    // z = a + b*y
    var a = (x0 * x0 + y0 * y0 + z0 * z0 + rf * rf - re * re - y1 * y1) / (2.0 * z0),
        b = (y1 - y0) / z0;

    // Discriminant
    var d = -(a + b * y1) * (a + b * y1) + rf * (b * b * rf + rf);
    if (d < 0) {
      // Non-existing position. return early with error.
      return [1, 0];
    }

    // Choose outer position of cicle
    var yj = (y1 - a * b - Math.sqrt(d)) / (b * b + 1);
    var zj = a + b * yj;
    var theta = Math.atan(-zj / (y1 - yj)) * 180.0 / Math.PI + ((yj > y1) ? 180.0 : 0.0);

    return [0, theta]; // Return error, theta
  };

  // Calculate theta for each arm
  function inverse(x0, y0, z0) {
    var theta1 = 0,
        theta2 = 0,
        theta3 = 0,
        cos120 = Math.cos(Math.PI * (120/180)),
        sin120 = Math.sin(Math.PI * (120/180)),
        status = calcAngleYZ(x0, y0, z0);

    if (status[0] === 0) {
      theta1 = status[1];
      status = calcAngleYZ(x0 * cos120 + y0 * sin120, y0 * cos120 - x0 * sin120, z0, theta2);
    }

    if (status[0] === 0) {
      theta2 = status[1];
      status = calcAngleYZ(x0 * cos120 - y0 * sin120, y0 * cos120 + x0 * sin120, z0, theta3);
      theta3 = status[1];
    }

    return [status[0], theta1, theta2, theta3];
  };

  return {
    inverse: inverse
  };

}

module.exports = DeltaModel;
