//man (green) running from and shooting (blue) at zombies (red)
//montecarlo function to simulate randomness in velocity of man
var monteCarlo = function() {
    while (true) {
        var r1 = random(1);
        var probability = r1;
        var r2 = random(1);
        if (r2 < probability) {
            return r1;
        }
    }
};

var Man = function() {
    this.position = new PVector(width/2, height/2);
    this.velocity = new PVector(monteCarlo(), monteCarlo());
    this.acceleration = new PVector(-0.001, 0.01);
    this.mass = 1;
    this.life = 100;
};

//random walk on by default
Man.prototype.update = function() {
    this.acceleration = PVector.random2D();
    this.acceleration.mult(monteCarlo());
    this.velocity.add(this.acceleration);
    this.velocity.limit(6);
    this.position.add(this.velocity);
};

Man.prototype.display = function() {
    strokeWeight(10);
    stroke(21, 255, 0);
    point(this.position.x, this.position.y);
};

//keyclicks
Man.prototype.handleKeyPress = function() {
    if (keyIsPressed){
        if (keyCode === UP) {
            this.velocity.y -= 5;
        }
        else if (keyCode === DOWN) {
            this.velocity.y += 5;
        }
        else if (keyCode === LEFT) {
            this.velocity.x -=5;
        }
        else if (keyCode === RIGHT) {
            this.velocity.x +=5;
        }
    }
};


//particles for bullets
var Particle = function(position) {
    this.acceleration = new PVector(random(-1, 1), random(-1, 1));
    this.velocity = new PVector(random(-1, 1), random(-1, 1));
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
    stroke(0, random(0, 255), random(0, 255));
    strokeWeight(2);
    fill(170, 0, 255);
    var radius = 10;
    ellipse(this.position.x, this.position.y, radius, radius);
};

Particle.prototype.isDead = function() {
    if (this.timeToLive < 0) {
        return true;
    } else {
        return false;
    }
};

//particle system to manage the bullets and zombies
var ParticleSystem = function(position) {
    this.origin = position.get();
    this.particles = [];
};

//zombie; a different type of particle with its own set of movement and spawning rules
var Zombie = function(position) {
    Particle.call(this, position);
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(-0.001, 0.01);
    this.mass = random(1, 10);
    this.timeToLive = 1000;
};

ParticleSystem.prototype.addParticle = function() {
    if (frameCount % 10 === 0) {
    this.particles.push(new Particle(this.origin));
    }
    if (frameCount % 360 === 0) {
        this.particles.push(new Zombie(this.origin));
    }
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

var man = new Man();

var bullets = new ParticleSystem(man.position);

//zombie's acceleration based on man's movements
Zombie.prototype = Object.create(Particle.prototype);

Zombie.prototype.update = function() {
    var maxDir = PVector.sub(new PVector(0, 0), new PVector (width - 1, height - 1));
    var maxMag = maxDir.mag ();    
    
    var mag = new PVector(man.position.x, man.position.y);
    var dir = PVector.sub(mag, this.position);
    var closeness = ((maxMag - dir.mag()) / maxMag);
    
    dir.normalize();
    dir.mult(closeness);
    
    this.acceleration = dir;
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.mass);
    this.position.add(this.velocity);
    this.timeToLive -= 1;
};

Zombie.prototype.display = function() {
    noStroke();
    fill(255, 0, 0);
    ellipse(this.position.x, this.position.y, 15, 15);
};

Zombie.prototype.applyForce = function(force) {
  var f = PVector.div(force, this.mass);
  this.acceleration.add(f);
};

Zombie.prototype.checkEdges = function() {
    if (this.position.x > width) {
        this.position.x = 0;
    } else if (this.position.x < 0) {
        this.position.x = width;
    }

    if (this.position.y > height) {
        this.position.y = 0;
    } else if (this.position.y < 0) {
        this.position.y = height;
    }
};

var zombies = new ParticleSystem(new PVector (width, height));

Man.prototype.checkEdges = function() {
  if (this.position.x > width) {
    this.position.x = 0;
  } else if (this.position.x < 0) {
    this.position.x = width;
  }

  if (this.position.y > height) {
    this.position.y = 0;
  } else if (this.position.y < 0) {
    this.position.y = height;
  }
};

mouseClicked = function() {
    Program.restart();
};

draw = function() {
    background(0, 0, 0);
    bullets.origin = man.position;
    bullets.run();
    bullets.addParticle();
    zombies.run();
    zombies.addParticle();
    man.display();
    man.checkEdges();
    man.handleKeyPress();
    man.update();
};
