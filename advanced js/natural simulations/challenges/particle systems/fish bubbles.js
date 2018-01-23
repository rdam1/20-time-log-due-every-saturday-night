var Particle = function(position) {
    this.acceleration = new PVector(0, -0.05);
    this.velocity = new PVector(random(-1, 1), random(-1, 0));
    this.position = position.get();
    this.timeToLive = 200;
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
    stroke(255, 255, 255, 100);
    strokeWeight(2);
    fill(255, 255, 255, 50);
    var radius = (400-this.position.y)/20;
    ellipse(this.position.x, this.position.y, radius, radius);
};

Particle.prototype.isDead = function() {
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
    this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
    for (var i = this.particles.length-1; i >= 0; i--) {
        var p = this.particles[i];
        p.run();
        if (p.isDead()) {
            this.particles.splice(i, 1);
        }
    }
};

var Fish = function(position) {
    this.position = position.get();
    this.width = 100;
    this.height = 60;
    this.flip = false;
};

Fish.prototype.swim = function() {
    if (this.position.x > width+60) {
        this.position.x = -60 ;
    }
    else if (this.position.x < 0) {
        this.position.x += 1 ;
    } else {
        this.position.x += 1 ;
    }

};

Fish.prototype.display = function() {
    noStroke();
    fill(255, 191, 0);
    ellipse(this.position.x, this.position.y, this.width, this.height);
    triangle(this.position.x-this.width/2+10, this.position.y,
             this.position.x-this.width*0.75, this.position.y+this.height/3,
             this.position.x-this.width*0.75, this.position.y-this.height/3);
    fill(255, 191, 0);
    triangle(this.position.x+this.width/2+10, this.position.y-this.height/12,
             this.position.x+this.width/2-2, this.position.y+this.height/8,
             this.position.x+this.width/2-2, this.position.y-this.height/8);
    triangle(this.position.x+this.width/2+10, this.position.y-this.height/12+18,
             this.position.x+this.width/2-10, this.position.y+this.height/8+10,
             this.position.x+this.width/2-12, this.position.y-this.height/8+10);
    fill(255, 255, 255);
    ellipse(this.position.x+this.width/2-10, this.position.y-11, 15, 20);
    fill(0, 0, 0);
    ellipse(this.position.x+this.width/2-7, this.position.y-10, 6, 6);
};

Fish.prototype.getMouthPosition = function() {
    return new PVector(this.position.x+this.width/2+10, this.position.y);
};

var fish = new Fish(new PVector(width/2, height/2));
var bubbles = new ParticleSystem(fish.getMouthPosition());

draw = function() {
    background(17, 78, 117);
    bubbles.origin.set(fish.getMouthPosition().get());
    bubbles.run();
    if (frameCount % 10 === 0) {
    bubbles.addParticle();
    }
    fish.swim();
    fish.display();
};
