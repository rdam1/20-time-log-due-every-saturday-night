var r = 0;
var theta = 0;

draw = function() {
    //background(255, 255, 255);
    
    pushMatrix();
    translate(width/2, height/2);
    
    var x = r * cos(theta);
    var y = r * sin(theta);
    
    fill(0, 0, 0);
    //line(0, 0, x, y);
    ellipse(x, y, 10, 10);
    popMatrix();
    r += 0.1;
    theta += 1;
};
