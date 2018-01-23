var Walker = function() {
    this.position = new PVector(width/2, height/2);
};

Walker.prototype.display = function() {
    strokeWeight(3);
    stroke(0, 0, 0, 10);
    point(this.position.x, this.position.y);
};

Walker.prototype.walk = function() {
    var velocity = new PVector(random(5), random(5));
    this.position.add(velocity);
};

var w = new Walker();

draw = function() {
    w.walk();
    w.display();
};
