angleMode = "radians";

var Particle = function(position) {
    this.acceleration = new PVector(0, -0.05);
    this.velocity = new PVector(random(-1, 1), random(0, -1));
    this.position = position.get();
    this.timeToLive = 255.0;
    
};

var Smoke = function (position) {
    Particle.call(this,position);
};

var Star = function (position) {
    Particle.call(this,position);
    this.starSize = random(6, 20);
};


Particle.prototype.run = function() {
    this.update();
    this.display();
};

Particle.prototype.update = function(){
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.timeToLive -= 2;
};

Particle.prototype.display = function() {
    stroke(0, 0, 0, this.timeToLive);
    strokeWeight(2);
    fill(255, 0, 0, this.timeToLive);
    ellipse(this.position.x, this.position.y, 12, 12);
};




Particle.prototype.isDead = function(){
    if (this.timeToLive < 0) {
        return true;
    } else {
        return false;
    }
};

var ParticleSystem = function(position) {
    this.origin = position.get();
    this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
    //this.particles.push(new Particle(this.origin));
    var mixing = random (0,1);
    if (mixing > 0.5) {
        this.particles.push(new Smoke(this.origin));
    } else {
       this.particles.push(new Star(this.origin));
    }
    //this.particles.push(new Smoke(this.origin));
    //this.particles.push(new Star(this.origin));
};

ParticleSystem.prototype.run = function(){
	for (var i = this.particles.length-1; i >= 0; i--) {
    var p = this.particles[i];
    p.run();
    if (p.isDead()) {
        this.particles.splice(i, 1);
    }
  }
};

var particleSystem = new ParticleSystem(new PVector(width/2, 280));

Smoke.prototype = Object.create(Particle.prototype);
Smoke.prototype.constructor = Smoke;

Smoke.prototype.display = function() {
    noStroke();
    //strokeWeight(2);
    fill(255, 255, 255, this.timeToLive);
    ellipse(this.position.x, this.position.y, 12, 12);
    
};


var smoke = new Smoke(new PVector(width/2, 280));


Star.prototype = Object.create(Particle.prototype);
Star.prototype.constructor = Star;

Star.prototype.display = function() {
    image(getImage("cute/Star"),this.position.x, this.position.y, 10+this.starSize,10+this.starSize);
};

var star = new Star(new PVector(width/2, 280));



draw = function() {
    background(72, 7, 105);
    particleSystem.addParticle();
    particleSystem.run();
  
    // The magical cauldron
    fill(36, 36, 36);
    var cauldronX1 = 150;
    var cauldronX2 = 250;
    var cauldronY = 285;
    bezier(cauldronX1, cauldronY,
           cauldronX1-100, cauldronY+145,
           cauldronX2+100, cauldronY+145,
           cauldronX2, cauldronY);
};
