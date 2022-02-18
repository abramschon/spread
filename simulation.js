let num = 1000; // Number of points
let range = 1; // Range of randomness
let lam_slider; 
let lambda = 0.9; // influence of memory
let dist = 10; // closeness of infection

let ax = [];
let ay = [];
let tendx = []; //history x coord
let tendy = []; // histroy y coord
let stat = []; // status of ith point
                // 0 - uninfected, 1 - infected



function setup() { // Randomly initialise the points
  var canvas = createCanvas(1000, 500);
  canvas.parent('simulation');
  lam_slider = createSlider(0, 1, 0.5,0.01);
  lam_slider.position(10, 10);
  lam_slider.style('width', '80px');
  
  for ( let i = 0; i < num; i++ ) { 
    ax[i] = random(0, width);
    ay[i] = random(0, height);
    tendx[i] = ax[i];
    tendy[i] = ay[i];
    stat[i] = 0; // by default set all to unifected
  }
  stat[0] = 1; // make the first person infected
  
  frameRate(30);
}


function draw() {
  background('white'); 

  // get slider value
  lambda = lam_slider.value();
  move();
  interact();
 
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
  }
}

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
  }
}

function interact(){
  // update interactions between particles
  for ( let i = 0; i < num; i++ ) { // go through uninfecteds
    if (stat[i]==1){
      continue;
    }
    for ( let j = 0; j < num; j++ ) { //go through infecteds
      if (stat[j]==0 ){
        continue;
      }
      if ( sqrt( (ax[i]-ax[j])**2 + (ay[i]-ay[j])**2 ) < dist ){
        stat[i]=1;
        break;
      }
    }
  }
}
