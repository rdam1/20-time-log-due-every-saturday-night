var Walker = function() {
    this.x = width/2;
    this.y = height/2;
    this.tx = 0;
    this.ty = 500;
};

Walker.prototype.display = function() {
    strokeWeight(3);
    stroke(50, this.x, this.y, 5);
    point(this.x, this.y);
};

Walker.prototype.walk = function() {
 
    var xStepSize = map(noise(this.tx), 0, 1, 0, width);
    var yStepSize = map(noise(this.ty), 0, 1, 0, height);

    this.x = xStepSize;
    this.y = yStepSize;
    this.tx += 0.001;
    this.ty += 0.001;
};

var w = new Walker();

draw = function() {
    w.walk();
    w.display();
};
