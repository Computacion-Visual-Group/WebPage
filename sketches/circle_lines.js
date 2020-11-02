var circsPhase = [];
var numCircs = 10;
var circDiameter = Math.min(innerWidth, innerHeight) * 0.8;
var phase = 0.0;
var circFactor = 0.03;
var btnColor1 = 40;
var btnColor2 = 60;
var flag = false;
function setup() {
  createCanvas(innerWidth, innerHeight);
  background(50);
  for (let i = 0; i < numCircs; i++) {
    circsPhase[i] = PI / numCircs * i;
  }
  
}

function addCircles(){
    numCircs++;
    numCircs = max(1,numCircs);
    for(let i = 0; i < numCircs; i++){
        circsPhase[i] = PI / numCircs * i;
    }
}

function remCircles(){
    numCircs--;
    numCircs = max(1,numCircs);
    for(let i = 0; i < numCircs; i++){
        circsPhase[i] = PI / numCircs * i;
    }
}

function Linesfun(){
    flag = !flag;
}
function draw() {
  circFactor = -0.011*Math.log(numCircs) + 0.057;
  circFactor = max(0.012,circFactor);
  
  background(1000);
  
  noFill();

  button1 = createButton('AGREGAR CIRCULOS');
  button2 = createButton('REMOVER CIRCULOS');
  button3 = createButton('LINES');
  button1.position(width/2 + 30, height - 270);
  button1.mousePressed(addCircles);

  button2.position(width/2 - 30 - button2.width, height - 270);
  button2.mousePressed(remCircles);

  button3.position(width/2 - 30 , height - 300);
  button3.mousePressed(Linesfun);

  stroke(200);
  fill(0);
  translate(width / 2, height / 2);
  ellipse(0, 0, circDiameter, circDiameter);
  stroke(200, 80);
  for (let i = 0; i < numCircs; i++) {
    let x = circDiameter / 2 * cos(circsPhase[i]);
    let y = circDiameter / 2 * sin(circsPhase[i]);
    let x2 = circDiameter / 2 * cos(circsPhase[i] + PI);
    let y2 = circDiameter / 2 * sin(circsPhase[i] + PI);
    if(flag == true){
        line(x, y, x2, y2);
    }
    
  }
  stroke(200);

  for (let i = 0; i < numCircs; i++) {
    fill(1000);
    let r = circDiameter / 2 * sin(circsPhase[i] + phase);
    ellipse(r, 0, circDiameter * circFactor, circDiameter * circFactor);
    rotate(PI / numCircs);
  }
  phase += 0.02;
}