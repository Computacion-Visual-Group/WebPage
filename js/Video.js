let fingers;
let frate = []
let count = 0;
let beginning = true;
let avg = 0;

function setup() {
  let cnv = createCanvas(1200, 400, P2D);
  cnv.parent('VideoContainer');
  fingers = createVideo(['assets/video.mp4', 'video.webm']);
  var a = select("#btnVideo");
  a.mousePressed(_action);
}

function draw() {
  background(250);
  image(fingers, 650, 20); 
  filter(GRAY);
  image(fingers, 50, 20); 
  let fr = frameRate();
  frate[count] = fr;
  count++;
}

function _action() {
  fingers.loop(); 
  if (beginning === true) {
    count = 0;
    fingers.play();
    beginning = false;
  } else {
    beginning = true;
    fingers.stop();
    for(let i = 0; i < frate.length; i++){
        avg+=frate[i];
    }
    avg /= frate.length;
    console.log(avg);
    textSize(40);
    text(avg, 0, 0);
    avg = 0;
  }
}