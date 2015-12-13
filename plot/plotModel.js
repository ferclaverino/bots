function PlotModel() {

  // Calculate theta for each arm
  function inverse(x, y) {
    if (x == 0 && y == 0) return [5, 5];
    if (x == 0 && y == 100) return [95, 95];

    return [5, 5];
  };

  return {
    inverse: inverse
  };

}

module.exports = PlotModel;
