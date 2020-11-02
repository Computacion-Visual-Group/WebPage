/*
 * @name Blur
 * @description A low-pass filter that blurs an image. This program analyzes every pixel in an image and blends it with all the neighboring pixels to blur the image.
 * <br><br><span class="small"><em>This example is ported from the <a href="https://processing.org/examples/blur.html">Blur example</a>
 * on the Processing website</em></span>
 */
// to consider all neighboring pixels we use a 3x3 array
// and normalize these values
// v is the normalized value
let v = 1.0 / 9.0;
// kernel is the 3x3 matrix of normalized values
let kernel = [[ v, v, v ], [ v, v, v ], [ v, v, v ]]; 

// preload() runs once, before setup()
// loadImage() needs to occur here instead of setup()
// if loadImage() is called in setup(), the image won't appear 
// since noLoop() restricts draw() to execute only once
// (one execution of draw() is not enough time for the image to load),
// preload() makes sure image is loaded before anything else occurs
let img;
let edgeImg;



// setup() runs once after preload
function setup() {
  img = loadImage("images/Tokio.jpg"); 
  edgeImg = loadImage("images/Tokio.jpg"); 
  // create canvas
  createCanvas(800, 266);

       
}

function calculate(){
  let sum = 0; 
  for (let x = 1; x < img.width; x++) {
    for (let y = 1; y < img.height; y++) {
      // kernel sum for the current pixel starts as 0
     

      // kx, ky variables for iterating over the kernel
      // kx, ky have three different values: -1, 0, 1
      for (var kx = -1; kx <= 1; kx++) {
        for (var ky = -1; ky <= 1; ky++) {
          let xpos = x + kx;
          let ypos = y + ky;
          
          // since our image is grayscale, 
          // RGB values are identical
          // we retrieve the red value for this example 
          // (green and blue work as well)
          let val = red(img.get(xpos, ypos));

          // accumulate the  kernel sum
          // kernel is a 3x3 matrix
          // kx and ky have values -1, 0, 1
          // if we add 1 to kx and ky, we get 0, 1, 2
          // with that we can use it to iterate over kernel
          // and calculate the accumulated sum
          sum += kernel[kx+1][ky+1] * val;
        }
      }
      edgeImg.set(x, y, color(sum));
    }
}


}

// draw() runs after setup(), normally on a loop
// in this case it runs only once, because of noDraw()
function draw() {

  // place the original image on the upper left corner
  
  image(img, 0, 0);  
  image(edgeImg, img.width, 0);
}