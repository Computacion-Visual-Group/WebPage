
let img; // Declarar variable 'img'.

function setup() {
    let h1 = createElement("h1", "Levels Histogram");
    h1.style("z-index", 50);
    h1.style("x-index", 150);
    h1.style("x-index", width / 2);
    h1.style("x-index", width / 2);
  createCanvas(720, 400);
  img = loadImage('images/Tokio.jpg'); // Cargar la imagen
}

function draw() {
  // Muestra la imagen en su tamaño original en la posición (0,0)
  image(img, 0, 0);
  // Muestra la imagen en la posición (0, height/2) a la mitad del tamaño
  image(img, 0, height / 2, img.width / 2, img.height / 2);
}