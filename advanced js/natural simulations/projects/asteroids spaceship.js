angleMode = "radians";
var moving = false;
var turnL = false;
var turnR = false;

//spaceship
var Ship = function() {
    this.position = new PVector(width/2, height/2);
    this.velocity = new PVector(3, 0);
    this.acceleration = new PVector(0, 0);
    this.topspeed = 5;

    this.update = function (moving) {
        if (moving) {
            this.velocity.add(this.acceleration);
            this.velocity.limit(this.topspeed);
            this.position.add(this.velocity);
        }
        this.acceleration.mult(0);
    };

    this.display = function() {
        var angle = this.velocity.heading();
        stroke(0, 0, 0);
        strokeWeight(2);
        pushMatrix();
        rectMode(CENTER);
        translate(this.position.x, this.position.y);
        rotate(angle);
        
        //add flames to thrusters
        if (moving) {
            fill(random(100, 255), random(100, 255), 0, random(100, 200));
            ellipse(-25, 8, 20, 10);
            ellipse(-25, -8, 20, 10);
        }
        fill(184, 189, 194);
        rect(-20, -8, 10, 10);
        rect(-20, 8, 10, 10);
        fill(175, 201, 240);
        triangle(20, 0, -20, -20, -20, 20);
        popMatrix();
    };

    this.applyForce = function(force) {
        this.acceleration.add(force);
    };
    
    //turn functions
    this.turnLeft = function() {
        var force = this.velocity.get();
        force.rotate(-PI/16);
        this.applyForce(force);
    };
    
    this.turnRight = function() {
        var force = this.velocity.get();
        force.rotate(PI/16);
        this.applyForce(force);
    };
    

    //stay on screen
    this.checkEdges = function() {
        if (this.position.x > width) {
            this.position.x = 0;
        } 
        else if (this.position.x < 0) {
            this.position.x = width;
        }
        if (this.position.y > height) {
            this.position.y = 0;
        } 
        else if (this.position.y < 0) {
            this.position.y = height;
        }
    };
};

var ship = new Ship();

//stars
var drawStars = function() {
    var standardDeviation = 175;
    var generator = new Random(1);
    var mean = 125;
    for (var i = 0; i < 100; i++) {
        var starX = standardDeviation * generator.nextGaussian() + mean;
        var starY = standardDeviation * generator.nextGaussian() + mean;
        strokeWeight(3);
        stroke(255, 255, 255, random(255));
        point(starX, starY);
    }
};

draw = function() {
    background(0, 0, 0);
    drawStars();
    if (turnL) {
        ship.turnLeft();
    }
    else if (turnR) {
        ship.turnRight();
    }
    ship.display();
    ship.update(moving);
    ship.checkEdges();
};

//assign key controls
var keyPressed = function() {
    if (key.toString() === "z" || keyCode === UP) {
        moving = true;
    }
    if (key.toString() === "x" || keyCode === DOWN) {
        moving = false;
    }
    if (keyCode === LEFT) {
        turnL = true;
    }
    else if (keyCode === RIGHT) {
        turnR = true;
    }
};

var keyReleased = function() {
    if (keyCode === LEFT) {
        turnL = false;
    }
    else if (keyCode === RIGHT) {
        turnR = false;
    }
};
