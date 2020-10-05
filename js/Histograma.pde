                 
PImage img;

void setup() {
  size(800, 600);
  img = loadImage("Tokio.jpg"); // Load the original image
  noLoop();
} 
//Promedio, Luma y Brillo.

void draw() {
  image(img, 0, 0); // Displays the image from point (0,0) 
  img.loadPixels();
  int[] hist = new int[256];
  
    // Create an opaque image of the same size as the original
  PImage edgeImg = loadImage("Tokio.jpg");

  image(edgeImg, width/2, 0); // Draw the new image  
  
  // Calculate the histogram
  for (int i = 0; i < img.width; i++) {
    for (int j = 0; j < img.height; j++) {
      int bright = int(brightness(get(i, j)));
      hist[bright]++; 
    }
  }
  // Find the largest value in the histogram
int histMax = max(hist);

stroke(255);

for (int i = 0; i < img.width; i += 2) {
  // Map i (from 0..img.width) to a location in the histogram (0..255)
  int which = int(map(i, 0,img.width, 0, 255));
  // Convert the histogram value to a location between 
  // the bottom and the top of the picture
  int y = int(map(hist[which], 0, histMax, img.height, 0));
  line(img.width+i, img.height, img.width+i, y);
}

}
