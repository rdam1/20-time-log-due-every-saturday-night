//forked from Project: Fish Tank
var bodyLength = 130;
var bodyHeight = 70;
var bodyColor = random(0,255);

draw = function() {
    var tailWidth = bodyLength/4;
    var tailHeight = bodyHeight/2;
    background(175, 246, 247);
    // body
    ellipse(mouseX, mouseY, bodyLength, bodyHeight);
    fill(random(0,255));
    ellipse(mouseX, mouseY, bodyLength/10, bodyHeight/10);
    fill(random(0,255),random(0,255),random(0,255));
    ellipse(mouseX, mouseY, bodyLength/20, bodyHeight/20);
    // eye
    fill(33, 33, 33);
    ellipse(mouseX+bodyLength/4, mouseY, bodyHeight/5 ,bodyHeight/5);
    fill(bodyColor);
    // tail
    triangle(mouseX-bodyLength/2, mouseY,
    mouseX-bodyLength/2-tailWidth, mouseY-tailHeight,
    mouseX-bodyLength/2-tailWidth, mouseY+tailHeight);
    bodyLength += 1;
    bodyHeight += 1;
};
