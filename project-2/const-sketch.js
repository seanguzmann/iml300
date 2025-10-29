let circles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  
  drawCircles();
}

function drawCircles() {
  fill(255);
  stroke(255);
  for(let i=0; i<circles.length; i+=2) {
    circle(circles[i], circles[i + 1], 5);
    if(circles.length - i > 3) {
      line(circles[i], circles[i+1], circles[i+2], circles[i+3]);
    }
  }
}

function mousePressed() {
  circles.push(mouseX, mouseY);
}
