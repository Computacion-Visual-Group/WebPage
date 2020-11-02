var x = 0;
let lapse = 0;    // mouse timer

function setup() {
  createCanvas(1112, 834);
	colorMode(HSB, 255);
  background(0);
	x = 500;
}

function draw() {
	
  drawCircle(width / 2, height / 2, x);
	x -= 5;
		rotate(PI/4);
	if (x == 80) {
  	noLoop();
	}
}

function drawCircle(x, y, r) {
  
  stroke(r%255, 200, 255);
  noFill();
  ellipse(10*sin(frameCount*.01)+x, y, r, r);
  if (r > 2) {
	
    drawCircle(x + r / 2, y, r / 2);
    drawCircle(x - r / 2, y, r / 2);
  }
}

function mousePressed(){
// prevents mouse press from registering twice
  if (millis() - lapse > 500){
    save('pix.jpg');
    lapse = millis();
  } 
} 
