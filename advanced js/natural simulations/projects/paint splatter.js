var brush = new Random(1);
var standardDeviation = 5;
var mean = 0;

var Paint = function() {
    this.x = width/2;
    this.y = height/2;
};

Paint.prototype.display = function() {
    noStroke();
    fill(50, this.y, this.x);
    ellipse(this.x, this.y, 5, 5);
};

Paint.prototype.splatter = function() {
    var xNum = brush.nextGaussian();
    var yNum = brush.nextGaussian();
    var xSplatter = standardDeviation * xNum + mean;
    var ySplatter = standardDeviation * yNum + mean;
    
    this.x += xSplatter;
    this.y += ySplatter;
};

var p = new Paint();

mouseClicked = function() {
    for (var i = 0; i < 51; i++) {
        p.splatter();
        p.display();
    }
};
