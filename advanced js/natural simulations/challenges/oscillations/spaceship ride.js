angleMode = "radians";

var Spaceship = function() {
    this.angle = new PVector();
    this.velocity = new PVector(random(-0.1, 0.1), random(-0.1, 0.1));
    this.amplitude = new PVector(random(20, width/2), random(20, width/2));
    this.position = new PVector(0, 0);
    this.a = 0;
    this.aVelocity = 0;
};

Spaceship.prototype.oscillate = function() {
    this.angle.add(this.velocity);
    this.position.set(
                sin(this.angle.x) * this.amplitude.x,
                sin(this.angle.y) * this.amplitude.y);
    var distance = dist(this.position.x, this.position.y, 0, 0);
    this.aVelocity += distance/100000;
    this.aVelocity = constrain(this.aVelocity, 0, 0.1);
    this.a += this.aVelocity;
};

Spaceship.prototype.display = function() {
    pushMatrix();
    translate(width/2, height/2);
    stroke(181, 63, 0);
    strokeWeight(9);
    line(0, 0, this.position.x, this.position.y);
    imageMode(CENTER);
    translate(this.position.x, this.position.y);
    rotate(this.a);
    image(getImage("space/octopus"), 0, 0, 80, 100);
    popMatrix();
};

var ships = [];
for (var i = 0; i < 10; i++) {
    ships.push(new Spaceship());
}

draw = function() {
    background(174, 218, 232);
    for (var i = 0; i < ships.length; i++) {
        ships[i].oscillate();
        ships[i].display();
    }
};
