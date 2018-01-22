var animals = ["cat", "dog", "bird", "mouse", "ya"];
var i = 0;
while(i < animals.length) {
    fill(255, 0, 0);
    text(animals[i], 10, 30+i*30);
    i++;
}
