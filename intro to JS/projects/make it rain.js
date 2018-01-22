var xPositions = [];
var yPositions = [0];
var rainColour = [];

var draw = function() {
    background(204, 247, 255);
    var i;
    for (i = 0; i < xPositions.length; i++) {
        noStroke();
        rainColour[i] = random(0,255);
        rainColour[i+1] = random(0,255);
        rainColour[i+2] = random(0,255);
        fill(rainColour[i], rainColour[i+1], rainColour[i+2]);
        ellipse(xPositions[i], yPositions[i]%400, 10, 10);
        yPositions[i] += 5;
    }
    
};

mouseClicked = function() {
    xPositions.push(mouseX);
    yPositions.push(mouseY);
    draw();
};
