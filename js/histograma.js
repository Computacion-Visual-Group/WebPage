
let img;

function setup() {
  
  let width = 800;
  let height = 800;

  let h1 = createElement("h1", "Levels Histogram");
  h1.style("z-index", 50);
  h1.style("x-index", 150);
  h1.style("x-index", width / 2);

  createCanvas(width, height);
  img = loadImage("images/Tokio.jpg");
  background(255);

  
  var pixelBrt = [0];
  for (let i = 0; i < 255; i++) {
    pixelBrt[i] = 0;
  }
  
  for (var x = 0; x < img.width; x++) {
    for (var y = 0; y < img.height; y++) {
      var loc = (x + y * img.width) * 4;
      pixelBrt[img.pixels[loc + 4]]++;

    }
  }
  
  var maxPixels = 0;
  for (let i = 0; i < 255; i++) {
    if (pixelBrt[i] > maxPixels) {
      maxPixels = pixelBrt[i];
    }
  }

  for (let i = 0; i < 255; i++) {
    let h = map(pixelBrt[i], 0, maxPixels, 0, height - img.height-10)
    fill(i, i, i);
    rect(0 + (i * (width / 255)), height, width / 255, -h);
  }

  
}

function draw() { 

  
  

  image(img, 0, 0);

}
