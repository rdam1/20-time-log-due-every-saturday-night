background(89, 216, 255);

var centerX;
var centerY;
var bodyColor;
textSize(50);
text("click!",140,200);

noStroke();

var drawFish = function(bodyLength, bodyHeight) {
    var tailWidth = bodyLength/4;
    var tailHeight = bodyHeight/2;
    // body
    ellipse(centerX, centerY, bodyLength, bodyHeight);
    // tail
    triangle(centerX-bodyLength/2, centerY,
    centerX-bodyLength/2-tailWidth, centerY-tailHeight,
    centerX-bodyLength/2-tailWidth, centerY+tailHeight);
    // eye
    fill(33, 33, 33);
    ellipse(centerX+bodyLength/4, centerY, bodyHeight/5 ,bodyHeight/5);
    fill(bodyColor);
};

mouseClicked = function(){
    centerX = random(0,400);
    centerY = random(0,400);
    bodyColor = color(random(0,255), random(0,255), random     (0,255));
    drawFish(random(120,140),random(50,90));
};
