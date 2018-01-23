angleMode = "radians";	
var a = 0;
draw = function() {
    background(255);
    pushMatrix();
    translate(200, 200);
    rotate(a);
    a += 0.05;
    fill(127, 127, 127);
    stroke(0, 0, 0);
    line(-50, 0, 50, 0);
    strokeWeight(2);
    ellipse(-50, 0, 16, 16);
    ellipse(50, 0, 16, 16);
    popMatrix();
};
