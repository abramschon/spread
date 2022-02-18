let chart;

function setup() {
  var canvas =createCanvas(400, 400);
  canvas.parent('empirical');
  let numPts = 7;
  dataX = [[2000, 2000.5, 2001, 2002, 2003, 2004, 2020], [2000, 2000.5, 2001, 2002, 2003, 2004, 2005]]
  // dataY = [[20, 50, 40, 60, 80, 100, 120], [150, 75, 32, 14, 7, 3.5]]
  data = []

  colors = ['#ff0000', '#5649ff']

  lineLabels = ["Infected", "Healthy"]

  for(let i = 0; i < dataX.length; i++) {
    data.push([])
    for(let j = 0; j < numPts; j++) {
      data[i].push(createVector(dataX[i][j], j)
    }
  }

  chart = new LineChart(data, colors, lineLabels, 250, 250, 5, 5, [min(dataX.flat()), max(dataX.flat())], [0, numPts+1]);
  //[min(dataY.flat()), max(dataY.flat())]
}

function draw() {
  background(220);
  chart.show()
}
