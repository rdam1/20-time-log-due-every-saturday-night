background(219, 255, 255);

fill(174, 180, 214);
triangle(200, 28, 350, 150, 50, 150);

fill(255, 255, 255);
rect(60, 150, 280, 207);

//a lot of windows is always good
for (var i = 1; i < 6; i++) {
    for (var e = 3; e < 7; e++) {
        fill(120, 80, 19);
        rect(60*i,50*e,40,40);
        fill(219, 255, 255);
        rect(60*i+4,50*e+4,32,32);
    }
}

fill(120, 80, 19);
rect(180, 280, 40, 77);

//grass
for (var a = 0; a < 5; a++) {
    image(getImage("cute/GrassBlock"), a*100, 300);
}
