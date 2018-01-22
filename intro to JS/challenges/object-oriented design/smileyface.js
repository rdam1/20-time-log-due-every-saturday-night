var SmileyFace = function(x,y) {
    this.centerX = x;
    this.centerY = y;
};
SmileyFace.prototype.draw = function() {
    fill(255, 234, 0);
    ellipse(this.centerX, this.centerY, 150, 150);
    fill(0, 0, 0);
    ellipse(this.centerX-30, this.centerY-30, 20, 20); 
    ellipse(this.centerX+30, this.centerY-30, 20, 20); 
    noFill(); 
    strokeWeight(3);
    arc(this.centerX, this.centerY+10, 64, 40, 0, 180);
};
SmileyFace.prototype.speak = function(kys) {
    text(kys, this.centerX, this.centerY);
};
var kms = new SmileyFace (200, 200);
kms.draw();
kms.speak("kys");

var kys = new SmileyFace(300, 250);
kys.draw();
kys.speak("die");
