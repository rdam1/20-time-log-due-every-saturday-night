angleMode = "radians";

var Pendulum = function(origin, armLength, ang) {
    this.origin = origin;
    this.armLength = armLength;
    this.position = new PVector();
    this.angle = ang;
    
    this.aVelocity = 0.0;
    this.aAcceleration = 0.0;
    this.damping = 0.995;
    this.ballRadius = 25.0;      
    this.dragging = false;
};

Pendulum.prototype.go = function() {
    this.update();
    this.display();
};

Pendulum.prototype.update = function() {
    // As long as we aren't dragging the pendulum, let it swing!
    if (!this.dragging) {
        // Arbitrary constant
        var gravity = 0.4;
        // Calculate acceleration
        this.aAcceleration = (-1 * gravity / this.armLength) * sin(this.angle);
        // Increment velocity
        this.aVelocity += this.aAcceleration;
        // Arbitrary damping
        this.aVelocity *= this.damping;
        // Increment angle
        this.angle += this.aVelocity;                         
    }
};

Pendulum.prototype.display = function() {
    if (this.origin instanceof PVector) {
        this.currentOrigin = this.origin;
    } else {
        this.currentOrigin = this.origin.position;
    }
    this.position = new PVector(
       this.armLength * sin(this.angle),
       this.armLength * cos(this.angle));
    this.position.add(this.currentOrigin);
    stroke(0, 0, 0);
    strokeWeight(3);
    line(this.currentOrigin.x, this.currentOrigin.y, this.position.x, this.position.y);
    fill(224, 194, 134);
    if (this.dragging) {
        fill(143, 110, 44);
    }
    ellipse(this.position.x, this.position.y, this.ballRadius, this.ballRadius);
};

Pendulum.prototype.handleClick = function(mx, my) {
    var d = dist(mx, my, this.position.x, this.position.y);
    if (d < this.ballRadius) {
        this.dragging = true;
    }
};

Pendulum.prototype.stopDragging = function() {
    this.aVelocity = 0;
    this.dragging = false;
};

Pendulum.prototype.handleDrag = function(mx, my) {
    if (this.dragging) {
      var diff = PVector.sub(this.currentOrigin, new PVector(mx, my));
      this.angle = atan2(-1*diff.y, diff.x) - radians(90);
    }
};

var limbLength = 75;
var leftArm1  = new Pendulum(new PVector(width/2-50, 110), limbLength, 1);
var leftArm2  = new Pendulum(leftArm1, limbLength, 2);
var rightArm1 = new Pendulum(new PVector(width/2+50, 110), limbLength, 3);
var rightArm2 = new Pendulum(rightArm1, limbLength, 4);
var leftLeg1  = new Pendulum(new PVector(width/2+40, 230), limbLength, 5);
var leftLeg2  = new Pendulum(leftLeg1, limbLength, 6);
var rightLeg1 = new Pendulum(new PVector(width/2-40, 230), limbLength, 7);
var rightLeg2 = new Pendulum(rightLeg1, limbLength, 8);

var limbs = [leftLeg1, leftLeg2,
                 rightLeg1, rightLeg2,
                 leftArm1, leftArm2,
                 rightArm1, rightArm2];

draw = function() {
    background(255);

    // Draw the body
    strokeWeight(4);
    line(width/2-50, 110, width/2+50, 110);
    line(width/2, 110, width/2, 230);
    line(width/2-40, 230, width/2+40, 230);
    fill(224, 194, 134);
    rect(width/2-25, 39, 50, 64, 30);
    for (var i = 0; i < limbs.length; i++) {
        limbs[i].go();
    }
};

mousePressed = function() {
    /*leftArm1.handleClick(mouseX, mouseY);
    rightArm1.handleClick(mouseX, mouseY);
    leftLeg1.handleClick(mouseX, mouseY); */
    for (var i = 0; i < limbs.length; i++) {
        limbs[i].handleClick(mouseX, mouseY);
    }
};

mouseDragged = function() {
    for (var i = 0; i < limbs.length; i++) {
        limbs[i].handleDrag(mouseX, mouseY);
    }
};

mouseReleased = function() {
    for (var i = 0; i < limbs.length; i++) {
        limbs[i].stopDragging();
    }
};
