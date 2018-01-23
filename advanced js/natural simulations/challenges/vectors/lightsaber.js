var  v = new PVector(50, 75);

var drawSaber = function() {
    background(0, 0, 0);
    // glow
    strokeWeight(8);
    stroke(107, 206, 219, 150);
    line(0, 400, v.x, 400-v.y);
    // blade
    stroke(255, 255, 255);
    strokeWeight(4);
    line(0, 400, v.x, 400-v.y);
};
keyPressed = function() {
    if (keyCode === UP) {
        v.mult(2);
    } else if (keyCode === DOWN) {
        v.div(2);
    }
    drawSaber();
};
