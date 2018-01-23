var Walker = function() {
    this.x = width/2;
    this.y = height/2;
};

Walker.prototype.display = function() {
    noStroke();
    fill(this.x, this.y, this.x);
    ellipse(this.x, this.y, 10, 10);
};

// Randomly move right, left, down, or up
Walker.prototype.walk = function() {
    var choice = floor(random(4));
    if (choice === 0) {
        //move right
        this.x += 3;
    } else if (choice === 1) {
        //move left
        this.x -= 3;
    } else if (choice === 2) {
        //move down
        this.y += 3;
    } else {
        //move up
        this.y -= 3;
    } 
};

var w = new Walker();

draw = function() {
    w.walk();
    w.display();
};
