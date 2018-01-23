var zOff = 0.0;
draw = function() {
    var xOff = 0.0;
    for (var x = 0; x < 100; x++) {
        var yOff = 0.0;
        for (var y = 0; y < 100; y++) {
            var bright = map(noise(xOff, yOff, zOff), 0, 1, 0, 255);
            stroke(bright, bright, bright);
            point(x, y);
            yOff += 0.01;
        }
        xOff += 0.01;
    }
    zOff += 0.1;
};
