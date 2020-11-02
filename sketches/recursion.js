let increment = 0;
let rectanglesStor = [];

function setup() {
    createCanvas(innerWidth, innerHeight);
    rectMode(CENTER);

    let test = new Rectangles()
    rectanglesStor.push(test)
    angleMode(DEGREES)
}




function draw() {
    background(255)
    noFill()
    stroke(0);

    increment++;

    if (increment > 10) {
        rectanglesStor.push(new Rectangles())
        increment = 0;
    }

    for (var i = 0; i < rectanglesStor.length; i++) {
        rectanglesStor[i].show();
        rectanglesStor[i].update();

        if (rectanglesStor[i].gone()) {
            rectanglesStor.splice(i, 1);
        }
    }
}


class Rectangles {
    constructor() {
        this.size = 5;
        this.rotation = 0;
    }

    update() {
        this.size++;
        this.rotation++;

    }

    show() {
        console.log(this.size)
        push()
        translate(width / 2, height / 2)
        rotate(this.rotation)
        rect(0, 0, this.size, this.size * 2)
        pop()
    }
    gone() {
        return this.size > width;
    }

}