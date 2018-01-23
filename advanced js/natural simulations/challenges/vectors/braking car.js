var Car = function() {
    this.position = new PVector(width/2, height/2);
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0, 0);
};

Car.prototype.update = function() {
    this.velocity.add(this.acceleration);
    if (this.velocity.x < 0) {
        this.velocity.set(0, 0);
    }
    this.velocity.limit(10);
    this.position.add(this.velocity);
};

Car.prototype.display = function() {
    stroke(0);
    strokeWeight(2);
    fill(255, 0, 0);
    rect(this.position.x-52, this.position.y-59, 60, 60);
    rect(this.position.x-74, this.position.y-30, 100, 31);
    fill(92, 92, 92);
    ellipse(this.position.x, this.position.y, 30, 26);
    ellipse(this.position.x-50, this.position.y, 30, 30);
};

Car.prototype.checkEdges = function() {
    if (this.position.x > width) {
        this.position.x = 0;
    } 
    else if (this.position.x < 0) {
        this.position.x = width;
    }
};

var car = new Car();

draw = function() {
    background(255, 255, 255);
    car.update();
    car.checkEdges();
    car.display();
    if (keyIsPressed && keyCode === RIGHT) {
        car.acceleration.set(0.1, 0);
    } else if (keyIsPressed && keyCode === LEFT) {
        car.acceleration.set(-0.1, 0);
    } else {
        car.acceleration.set(0, 0);
    }
};
