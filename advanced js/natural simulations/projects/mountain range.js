var drawRange = function(h, a, distance) {
    var incAmount = 0.01;
    fill(25+5*distance, 75+5*distance, 5+5*distance);
    for (var t = a; t-a < incAmount*width; t += incAmount) {
        var n = noise(t);
        var y = map(n, 0, 1, 0, height/2);
        rect(t*100-a*100, height-y-h, 1, y+h);
    }
};

var drawClouds = function(c) {
    var xOff = 0.0;
    for (var x = 0; x < 400; x++) {
        var yOff = 0.0;
        for (var y = 0; y < c; y++) {
            var bright = map(noise(xOff, yOff), 0, 1, 0, 255);
            stroke(bright+y+100, bright+y+100, bright+y+100, 100-(y/2));
            point(x, y);
            yOff += 0.01;
        }
           
        xOff += 0.01;
    }
};

var drawBird = function(num) {
    for (var i = 0; i < num; i++) {
        image(getImage("avatars/aqualine-ultimate"), random(width), random(height), random(100), random(100));
    }
};

noStroke();
background(155, 205, 255);
drawRange(100, 10000, 20);
drawRange(50, 500, 10);
drawRange(0, 0, 0);
drawClouds(200);
drawBird(random(25));
