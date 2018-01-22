var xPos = 0;
var yPos = 100;
var xpos = 200;
var ypos = 0;

draw = function() {
    background(29, 40, 115);
    fill(255, 242, 0);
    xPos += 1;
    yPos -= 1;
    ellipse(xPos, yPos, 10, 10);
    if (xPos > 150) {
        xpos += 2;
        ypos += 1;
        ellipse(xpos, ypos, 10, 10);
    }
};

