mouseMoved = function() {
    var mouse = new PVector(mouseX, mouseY);
    stroke(255, 0, 0);
    strokeWeight(3);
    line(0, 0, mouse.x, mouse.y);
    fill(255, 0, 0);
    text(mouse.mag(), mouse.x, mouse.y);
    
    var l = dist(0, 0, height, width);
    var bgColour = map(mouse.mag(), 0, l, 0, 255);
    background(2*bgColour, 5*bgColour, 3*bgColour);
};
