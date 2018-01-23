angleMode = "radians";


var Wave = function(amplitude, period, color) {
    this.startAngle = 0;
    this.amplitude = amplitude;
    this.period = period;
    this.color = color;
    this.angleVel = (TWO_PI / this.period) * 5;
};

Wave.prototype.update = function() {
    this.startAngle += TWO_PI / this.period;
};

Wave.prototype.draw = function() {
    var angle = this.startAngle;
    fill(this.color);
    for (var x = 0; x <= width; x += 20) {
        var y = this.amplitude*sin(angle);
        ellipse(x, y+height/2, 20, 20);
        angle += this.angleVel;
    }
};

var wave = new Wave(200, 175, color(255, 0, 0, 100));
var wave2 = new Wave (250, 200, color(255, 0, 0));

translate(0, height/2);

draw = function() {
    background(255);
    wave.update();
    wave.draw();
    wave2.update();
    wave2.draw();
};

