let canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("position", "fixed"); // stays fixed while scrolling
  canvas.style("z-index", "9999"); // sits above all content
  canvas.style("pointer-events", "none"); // click pass through
  noStroke();
}

function draw() {
  clear(); // clear frame

  // white grain with high opacity
  fill(255, 100); // increase second value to increase grain

  // map mouse position to a small offset value
  // using noise() here makes the movement feel a bit more organic than raw mouseX
  let shiftX = map(noise(frameCount * 0.01, mouseX * 0.001), 0, 1, -30, 30);
  let shiftY = map(
    noise(frameCount * 0.01 + 100, mouseY * 0.001),
    0,
    1,
    -30,
    30
  );

  // how many specks to draw based on total area pixels
  let density = width * height * 0.0008;

  // draws the grain
  for (let i = 0; i < density; i++) {
    // picks a random spot
    let x = random(width);
    let y = random(height);

    // draws tiny pixel at the cursor
    rect((x + shiftX + width) % width, (y + shiftY + height) % height, 1, 1);
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
