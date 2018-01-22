/*************
*OBJECT TYPES
**************/
/******************
*Flower Object Type
*******************/
var Flower = function(k,y,s) {
    this.x = k;
    this.y = y;
    this.height = s;
};

Flower.prototype.growBy = function(height) {
    this.height += 2 * height;
};

/*****************
*Tulip Object Type
******************/
var Tulip = function(x, y, height) {
    Flower.call (this, x, y, height);
};

Tulip.prototype = Object.create(Flower.prototype);

Tulip.prototype.draw = function() {
    noStroke();
    fill(16, 122, 12);
    rect(this.x, this.y, 10, -this.height);
    fill(255, 0, 0);
    // petals
    ellipse(this.x+5, this.y-this.height, 44, 44);
    triangle(this.x-16, this.y-this.height, 
            this.x+20, this.y-this.height,
            this.x-20, this.y-this.height-31);
    triangle(this.x-14, this.y-this.height, 
            this.x+24, this.y-this.height,
            this.x+3, this.y-this.height-39);
    triangle(this.x+-4, this.y-this.height, 
            this.x+26, this.y-this.height,
            this.x+29, this.y-this.height-36);
};

/*********************
*Sunflower Object Type
**********************/
var Sunflower = function(x, y, height) {
    Flower.call(this, x, y, height);
};
Sunflower.prototype = Object.create(Flower.prototype);

Sunflower.prototype.draw = function() {
    fill(16, 122, 12);
    
    rect(this.x, this.y, 10, -this.height);
    
    // petals
    stroke(0, 0, 0);
    fill(255, 221, 0);
    ellipse(this.x-10, this.y-this.height, 20, 18);
    ellipse(this.x+5, this.y-this.height-15, 20, 18);
    ellipse(this.x+5, this.y-this.height+15, 20, 18);
    ellipse(this.x+20, this.y-this.height, 20, 18);
    fill(20, 20, 20);
    ellipse(this.x+5, this.y-this.height, 20, 20);
};


/**************
*MAIN PROGRAM
***************/

/** create object instances **/
var tulip = new Tulip(38, 390, 150);
var sunflower = new Sunflower(186, 390, 100);
var kms = new  Tulip(1,1,1,1);
var kys = new Sunflower(2,2,2,2);


var drawScene = function() {
    background(207, 250, 255);
    tulip.draw();
    sunflower.draw();
    kms.draw();
    kys.draw();
};

mouseClicked = function() {
    tulip.growBy(10);
    sunflower.growBy(20);
    kms.growBy(10);
    kys.growBy(20);
    drawScene();
};

drawScene();
