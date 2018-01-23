//code forked from Angular Velocity lesson to create Red object

var Blue = function() {
    this.position = new PVector(width/2, height/2);
    this.velocity = new PVector(-random(2), -1);
    this.acceleration = new PVector(0, 0);
    
    //gives Blue object mass for Red to be attracted to later on
    this.mass = 20;
    this.G = 2;
};

//calculates gravitational attraction towards Blue object
Blue.prototype.calculateAttraction = function(m) {
    var force = PVector.sub(this.position, m.position);
    var distance = force.mag();
    distance = constrain(distance, 5, 25);
    force.normalize();
    var strength = (this.G * this.mass * m.mass) / (distance * distance);
    force.mult(strength);
    return force;
};

//acceleration/velocity control of Blue object
Blue.prototype.update = function() {
    this.velocity.add(this.acceleration);
    /*if (this.velocity.x > 0) {
        this.velocity.set(0, 0);
    }*/
    this.velocity.limit(10);
    this.position.add(this.velocity);
};

Blue.prototype.display = function() {
    background(255, 255, 255);
    fill(0, 0, 255);
    triangle(this.position.x, this.position.y, this.position.x+15, this.position.y+30, this.position.x+30, this.position.y+15);
    //image(getImage("avatars/aqualine-ultimate"), this.position.x, this.position.y, 50, 50);
};

//makes it so Blue object wraps around screen
Blue.prototype.checkEdges = function() {
    if (this.position.x > width) {
        this.position.x = 0;
    }
    else if (this.position.x < 0) {
        this.position.x = width;
    }
    if (this.position.y > height) {
        this.position.y = 0;
    } else if (this.position.y < 0) {
        this.position.y = height;
    }
};

var Red = function(m, x, y) {
    this.position = new PVector(x, y);
    //gives Red object a mass to be attracted to Blue object
    this.mass = m;
    this.velocity = new PVector(random(-1, 1), random(-1, 1));
    this.acceleration = new PVector(0, 0);
};

//applies grav. force from Blue object to Red object
Red.prototype.applyForce = function(force) {
    var f = PVector.div(force, this.mass);
    this.acceleration.add(f);
};

//calculates velocity of Red object when accelerating towards source of G. force
Red.prototype.update = function() {
    this.velocity.limit(4);
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
};

Red.prototype.display = function() {
    stroke(0, 0, 0);
    fill(255, 0, 0, 200);
    ellipseMode(CENTER);
    pushMatrix();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    ellipse(0, 0, this.mass*10, this.mass*10);
    popMatrix();
};

var Green = function(m, x, y) {
    this.position = new PVector(x, y);
    this.mass = m*200;
    this.angle = 0;
    this.aVelocity = 0;
    this.aAcceleration = 0;
    this.velocity = new PVector(random(-1, 1), random(-1, 1));
    this.acceleration = new PVector(0, 0);
};
    
//repulses Green object from Blue object
Green.prototype.applyForce = function(force) {
    var f = PVector.div(force, this.mass);
    this.acceleration.sub(f);
};

//applies repulsion to Green object and rotates object
Green.prototype.update = function () {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    
    this.aAcceleration = this.acceleration.x / 10.0;
    this.aVelocity += this.aAcceleration;
    this.aVelocity = constrain(this.aVelocity, -0.1, 0.1);
    this.angle += this.aVelocity;
    
    this.acceleration.mult(0);
};

//displays Green object
Green.prototype.display = function () {
    this.velocity.limit(0.1);
    stroke(0, 0, 0);
    fill(0, 255, 0, 200);
    rectMode(CENTER);
    pushMatrix();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    rect(0, 0, this.mass/10, this.mass/10);
    popMatrix();
};

//makes it so Green object doesn't get repulsed out of the screen
Green.prototype.checkEdges = function() {
    if (this.position.x > width) {
        this.position.x = 0;
    }
    else if (this.position.x < 0) {
        this.position.x = width;
    }
    if (this.position.y > height) {
        this.position.y = 0;
    } else if (this.position.y < 0) {
        this.position.y = height;
    }
};

var greens = new Green(10, 200, 200);

//displays Green object
draw = function() {
    background(255, 255, 255);
    greens.update();
    greens.display();
};

//creates multiple Green objects
var greens = [];
for (var i = 0; i < 5; i++) {
    greens.push(new Green(random(0.1, 2), random(width), random(height)));
}

var reds = new Red(10, 200, 200);

//displays Red object
draw = function() {
    background(255, 255, 255);
    reds.update();
    reds.display();
};

//creates multiple Red objects
var reds = [];
for (var i = 0; i < 20; i++) {
    reds.push(new Red(random(0.1, 2), random(width), random(height)));
}

//creates Blue object
var bloo = new Blue();

draw = function() {
    //draws Blue object
    background(255, 255, 255);
    bloo.update();
    bloo.checkEdges();
    bloo.display();
    
    //makes multiple red objects
    for (var i = 0; i < reds.length; i++) {
        var force = bloo.calculateAttraction(reds[i]);
        //applies attractive force of bloo to reds
        reds[i].applyForce(force);
        reds[i].update();
        reds[i].display();
    }
    //I wanted to make it so when accelerating in another direction the triangle would flip (scale(-1)), but I couldn't figure out how to do it.
    //var blooDir = "left";
    //changes acceleration of Blue object w/ arrow keys
    if (keyIsPressed && keyCode === UP) {
        bloo.acceleration.set(bloo.acceleration.x, -0.1);
    } else if (keyIsPressed && keyCode === DOWN) {
        bloo.acceleration.set(bloo.acceleration.x, 0.1);
    } else if (keyIsPressed && keyCode === LEFT) {
        /*if (blooDir === "right") {
            scale(-1);
        }*/
        bloo.acceleration.set(-0.1, bloo.acceleration.y);
        //blooDir = "left";
    } else if (keyIsPressed && keyCode === RIGHT) {
        /*if (blooDir === "left") {
            scale(-1);
        }*/
        bloo.acceleration.set(0.1, bloo.acceleration.y);
        //blooDir = "right";
    } else {
        bloo.acceleration.set(0, 0);
    }
    
    for (var i = 0; i < greens.length; i++) {
        var force = bloo.calculateAttraction(greens[i]);
        greens[i].applyForce(force);
        greens[i].checkEdges();
        greens[i].update();
        greens[i].display();
    }
};

