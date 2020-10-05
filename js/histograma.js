let img;// Source image
let dest;// Processed pixels
let sel;

let w = 456; // Size of processed pixels


let xstart = 0; // Where to process the pixels
let ystart = 0;
let kernel = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0]
];

function preload() {
  img = loadImage("images/Tokio.jpg");

}

function setup() {
  createCanvas(256, 180);

  pixelDensity(1); // turn off HPDI displays (like retina)
  // Create a blank image to write processed pixels to
  dest = createImage(w, w);
  sel = createSelect();
  sel.position(10, img.heigth);
  sel.option('Blur');
  sel.option('Edge detection');
  sel.option('Box blur');
  sel.option('Edge detection 2');
  sel.selected('Blur');
  sel.changed(KernelSelect);
  // Pick random weights for the pixels
}
function KernelSelect(){
  let item = sel.value();
  if(item == 'Blur'){
    kernel = [
    [-1, -1, -1],
    [-1, 9, -1],
    [-1, -1, -1]
    ];
  }else if(item == 'Edge detection'){
    kernel = [
    [1, 0, -1],
    [0, 0, 0],
    [-1, 0, 1]
    ];
  }else if(item == 'Box blur'){
    kernel = [
    [0.1, 0.1, 0.1],
    [0.1, 0.1, 0.1],
    [0.1, 0.1, 0.1]
    ];
  }else if(item == 'Edge detection 2'){
    kernel = [
    [-1, -1,-1],
    [-1, 8, -1],
    [-1, -1,-1]
    ];
  }
}
function draw() {

  // We're only going to process a portion of the image
  // so let's set the whole image as the background first
  image(img, 0, 0);

  // In this example we are only processing a section of the image
  // an 80 x 80 rectangle
  let xend = xstart + w;
  let yend = ystart + w;
  let kernelsize = 3;

  // Load all the pixels
  dest.loadPixels();
  img.loadPixels();

  // Begin our loop for every pixel
  for (let x = 0; x < dest.width; x++) {
    for (let y = 0; y < dest.height; y++) {
      // Each pixel location (x,y) gets passed into a function called convolution()
      // The convolution() function returns a new color to be displayed.
      let result = convolution(img, x + xstart, y + ystart, kernel, kernelsize);
      let index = (x + y * dest.width) * 4;
      dest.pixels[index + 0] = result[0];
      dest.pixels[index + 1] = result[1];
      dest.pixels[index + 2] = result[2];
      dest.pixels[index + 3] = 255;
    }
  }
  dest.updatePixels();

  // Draw the convolved feature map
  image(dest, xstart, ystart);
  

  // Draw a rectangle for visual clarity
  stroke(0);
  noFill();
  rectMode(CORNERS);
  rect(xstart, ystart, xend, yend);
}

function convolution(img, x, y, kernel, kernelsize) {

  // Going to sum the RGB values of all the pixels
  let rsum = 0.0;
  let gsum = 0.0;
  let bsum = 0.0;

  // Offset around the center pixel
  let offset = floor(kernelsize / 2);

  // Loop through convolution kernel
  for (let i = 0; i < kernelsize; i++) {
    for (let j = 0; j < kernelsize; j++) {

      // What pixel are we testing
      let xpos = x + i - offset;
      let ypos = y + j - offset;
      // Find the 1D location in the array
      let index = (xpos + img.width * ypos) * 4;

      // Make sure we haven't walked off the edge of the pixel array
      // It is often good when looking at neighboring pixels to make sure we have not gone off the edge of the pixel array by accident.
      index = constrain(index, 0, img.pixels.length - 1);

      // Calculate the convolution
      // We sum all the neighboring pixels
      // multiplied by the weights in the convolution kernel.
      rsum += img.pixels[index + 0] * kernel[i][j];
      gsum += img.pixels[index + 1] * kernel[i][j];
      bsum += img.pixels[index + 2] * kernel[i][j];
    }
  }
  return [rsum, gsum, bsum];
}

