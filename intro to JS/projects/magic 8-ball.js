var r = 0;
var g = 0;
var b = 0;
fill(r, g, b);
ellipse(200, 200, 375, 375);
fill(60, 0, 255);
triangle(200, 104, 280, 280, 120, 280);
fill(255, 255, 255);
mouseClicked = function() {
    if (mouseX>120&&mouseX<280&&mouseY>104&&mouseY<280) {
        fill(60, 0, 255);
        triangle(200, 104, 280, 280, 120, 280);
        fill(255, 255, 255);
        var answer = floor(random(1, 6));
        text(answer,197,125);
        if (answer>=1&&answer<5) {
            if (answer === 1) {
                text("ye", 192, 225);
            }else if(answer === 2) {
                text("mayb", 185, 225);
            }else if(answer === 3) {
                text("nah", 189, 225);
            }else if(answer === 4) {
                text("¯|_(ツ)_|¯", 176, 225);
            }
        }else {
            text("try again l8r", 168, 225);
        }
    }else{
        r = random(0, 255);
        g = random(0, 255);
        b = random(0, 255);
        fill (r, g, b);
        triangle(200, 104, 280, 280, 120, 280);
        fill(255, 255, 255);
        text("click on",178,220);
        text("the triangle",170,230);
    }
};
