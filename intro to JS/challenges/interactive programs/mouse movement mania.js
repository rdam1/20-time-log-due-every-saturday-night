draw = function() {
    stroke(mouseY, mouseX, mouseY);
    fill(mouseX, mouseY, 0);
    ellipse(mouseX, mouseY, mouseX, mouseY);
};
