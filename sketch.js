let chart;

function setup() {
  var canvas =createCanvas(1200, 700);
  canvas.parent('empirical');
  let numPts=20;
  dataX = [[2000, 2000.5, 2001, 2002, 2003, 2004, 2005, 2020], [2000, 2001, 2002, 2003, 2004, 2005]]
  // dataY = [[0, 1, 2, 3, 4, 5, 6], [0, 1, 2, 3, 4, 5]]
  data = []


  for(let i =0; i< numPts; i++){
   // randomY.push(random(100,300));
   dataX[0].push(random(2000,2030));
   dataX[0].sort(function(a, b) {return a - b;});
   print(dataX[0]);
  }


  colors = ['#ff0000', '#5649ff']
  
  lineLabels = ["Infected", "Healthy"]
  
  for(let i = 0; i < dataX.length; i++) {
    data.push([])
    for(let j = 0; j < dataX[i].length; j++) {
      data[i].push(createVector(dataX[i][j], j))
    }
  }
    
  chart = new LineChart(data, colors, lineLabels, 1200, 700, 0, 0, [min(dataX.flat()), max(dataX.flat())], [0, numPts+1]);
  //[min(dataY.flat()), max(dataY.flat())]
}

function draw() {
  background(220);
  chart.show()
}
