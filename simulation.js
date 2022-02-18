let num=1000; // Number of points
let num_slider; 
let lambda; // influence of memory
let lam_slider; 
let range = 1; // Range of randomness

let dist = 10; // closeness of infection

let simulate = false;

let ax = [];
let ay = [];
let tendx = []; //history x coord
let tendy = []; // histroy y coord
let stat = []; // status of ith point
                // 0 - uninfected, 1 - infected

let dataTime = []; // keep track of when things interacted
t = 0;

function setup() { // Randomly initialise the points
  var canvas = createCanvas(1000, 500);
  canvas.parent('simulation');
  //init sliders
  num_slider = createSlider(100, 1000, 500, 100);
  num_slider.parent('size');
  num_slider.style('width', '100px');
  lam_slider = createSlider(0, 1, 0.5, 0.01);
  lam_slider.parent('move');
  lam_slider.style('width', '100px');
  
  // layout random points
  layout_points();

  // init button for simulation
  button = createButton('Start');
  button.parent('start');
  button.mousePressed(start_sim);
  
  frameRate(30);
}

function start_sim() {
  layout_points();
  t=0;
  dataTime=[];
  simulate = true;
};


function draw() {
  background('white'); 

  if (!simulate) {
    lambda = lam_slider.value();
    num = num_slider.value();
  }
  if (simulate) {
    if (stat.reduce(getSum) == num) {
      simulate = false;
    };
    move();
    interact();
    t=t+1;
  };
  draw_points();
  document.getElementById("output").innerHTML = dataTime.toString();
};

function move(){
  // Randomly shift all coordinates and check  
  for ( let i = 0; i < num; i++ ) {
    // random component to update
    olax = ax[i];
    olay = ay[i];
    ax[i] = constrain(ax[i] + random(-range, range) + lambda * (ax[i]-tendx[i]), 0, width ) ; 
    ay[i] = constrain(ay[i] + random(-range, range) + lambda * (ay[i]-tendy[i]), 0, height) ; 
    tendx[i] = olax;
    tendy[i] = olay;
  };
};

function interact(){
  // update interactions between particles
  for ( let i = 0; i < num; i++ ) { // go through uninfecteds
    if (stat[i]==1){
      continue;
    };
    for ( let j = 0; j < num; j++ ) { //go through infecteds
      if (stat[j]==0 ){
        continue;
      };
      if ( sqrt( (ax[i]-ax[j])**2 + (ay[i]-ay[j])**2 ) < dist ){
        stat[i]=1;
        dataTime.push(t);
        break;
      };
    };
  };
};


function draw_points(){
  // Make coordinates into points
  for ( let i = 0; i < num; i++ ) {
    strokeWeight(10);
    if (stat[i]==1){
      stroke('red');
      point(ax[i], ay[i]);
      continue;
    }
    stroke('black');
    point(ax[i], ay[i]);
  };
};

function getSum(total, num) {
  return total + num;
};

function layout_points() {
  ax = [];
  ay = [];
  tendx = []; //history x coord
  tendy = []; // histroy y coord
  stat = [];  // status of ith point
              // 0 - uninfected, 1 - infected

  for ( let i = 0; i < num; i++ ) { 
    ax[i] = random(0, width);
    ay[i] = random(0, height);
    tendx[i] = ax[i];
    tendy[i] = ay[i];
    stat[i] = 0; // by default set all to unifected
  }
  stat[0] = 1; // make the first person infected
};
