//spider with oscillating legs
angleMode = radians; //rads for easier time calculating oscillation

var Spider = function(position, focus) {
    //base object with position, velocity, and mass, and random values for color
    this.position = position;
    this.velocity = new PVector(random(-1, 1), random(-1, 1));
    this.acceleration = new PVector(0, 0);
    var r = random(255);
    var g = random(255);
    var b = random(255);
    
    //body, with a line attached to center of web
    this.display = function() {
        pushMatrix();
        translate(width/2, height/2);
        fill(r, g, b);
        stroke(255, 255, 255, 100);
        line(this.position.x, this.position.y, 0, 0);
        noStroke();
        ellipse(this.position.x, this.position.y, 10, 10);
        popMatrix();
    };
    
    //calc spider movement + wrap around screen
    this.update = function() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        if (this.position.x > width/2) {
            this.position.x = -width/2;
        } else if (this.position.x < -width/2) {
            this.position.x = width/2;
        } else if (this.position.y > height/2) {
            this.position.y = -height/2;
        } else if (this.position.y < -height/2) {
            this.position.y = height/2;
        }
        this.velocity.limit(5);
        this.acceleration.mult(0);
    };
};

//create legs and move with angular rotation
var Leg = function(origin, angle, a) {
    this.origin = origin;
    this.position = new PVector(origin.position.x, origin.position.y);
    this.angle = angle;
    this.amplitude = 25;
    this.aVelocity = 0.05;
    this.a = a;
    var r = random(255);
    var g = random(255);
    var b = random(255);
    
    //leg placement based on spider body with var that allows multiple legs on each side
    //foot end of each leg has the oscillating variable applied to its y position
    this.display = function() {
        this.currentOrigin = this.origin.position;
        //oscillating variable
        var y = this.amplitude * sin(this.angle);
        pushMatrix();
        translate(width/2, height/2);
        stroke(0, 0, 0);
        fill(0, 0, 0);
        rotate(this.rotAngle);
        //apply the positioning variable (on position.x) and the rotating variable (on position.y) to one end of the leg
        line(this.currentOrigin.x, this.currentOrigin.y, this.a + this.currentOrigin.x, this.currentOrigin.y + y);
        popMatrix();
    };
    //apply the oscillation, keeping legs attached to body
    this.oscillate = function() {
        this.currentOrigin = this.origin.position;
        this.angle += this.aVelocity;
        this.position.add(this.currentOrigin);
    };
};

var spider = new Spider(new PVector(0, 0));
var legs = [];
//create 8 legs, with regularly spaced angles, 4 to the right of origin and 4 to the left of origin
for (var i = 0; i < 100; i += 25) {
    legs.push(new Leg(spider, i/PI, 25));
    legs.push(new Leg(spider, i/PI, -25));
}
//web background
var drawWeb = function() {
    strokeWeight(2);
    stroke(255, 255, 255);
    for (var i = 0; i < width; i += 100) {
        for(var j = 0; j < height; j += 100) {
        line(i, height - j, width - i, j);
        }
    }
};

draw = function() {
    background(125, 126, 133);
    drawWeb();
    for (var i = 0; i < legs.length; i++) {
        legs[i].display();
        legs[i].oscillate();
    }
    spider.display();
    spider.update();
};
