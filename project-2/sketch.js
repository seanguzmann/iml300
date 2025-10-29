// color array:
let colors = ["#ffc67c", "#e24c68", "#d97cff", "#ff7c7c"];

let count = 0;
let old_count = 0;
let startTime;

// speed of color shift (in milliseconds):
let my_interval = 2000;
let old_millis;

// gradient moves diagonally:
const Y_AXIS = 1; // Use 'const' for fixed values
const X_AXIS = 2; // Use 'const' for fixed values

// variables for current and future (next color):
var from_c;
var to_c;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB);
  old_millis = millis();

  // initial colors from array
  from_c = color(colors[count]);
  to_c = color(colors[(count + 1) % colors.length]);
}

function draw() {
  // deciding when to move to the next color in gradient:
  if ((millis() - old_millis) / my_interval >= 1) {
    count = (count + 1) % colors.length;
    old_millis = millis();
  }

  // color interpolation section:

  // gets the current color and the next color in the sequence:
  from_c = color(colors[count]);
  to_c = color(colors[(count + 1) % colors.length]);

  // blend factor
  let inter_amount = (millis() - old_millis) / my_interval;

  // current color blends to next color
  let c1 = lerpColor(from_c, to_c, inter_amount);

  // end color lags a bit to build a smoother blend
  let next_next_c = color(colors[(count + 2) % colors.length]);
  let c2 = lerpColor(to_c, next_next_c, inter_amount);

  // interaction logic: this portion of code checks where a user's mouse is on the screen. if it is on the left side, the gradient moves up and down; if it is on the right side, the gradient moves side to side.

  let dynamic_axis = map(mouseX, 0, width, Y_AXIS, X_AXIS, true);
  dynamic_axis = constrain(dynamic_axis, Y_AXIS, X_AXIS);
  setGradient(0, 0, width, height, c1, c2, dynamic_axis);
}

// actually drawing stripes of colors
function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  // left side: drawing gradient up & down
  if (axis <= (Y_AXIS + X_AXIS) / 2) {
    for (var i = y; i <= y + h; i++) {
      
      // subtly shifting the color when the mouse gets close to switching       between the two gradient directions

      var inter = map(i, y, y + h, 0, 1) * (X_AXIS - axis);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  }

  // right side: drawing gradient side to side
  if (axis >= (Y_AXIS + X_AXIS) / 2) {
    for (var i = x; i <= x + w; i++) {
      
      // subtly shifting the color when the mouse gets close to switching       between the two gradient directions

      var inter = map(i, x, x + w, 0, 1) * (axis - Y_AXIS);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}

// ensures animation follows the windowWidth & Height even when readjusted by the user
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
