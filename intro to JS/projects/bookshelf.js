var book = [
    {
        title: "The Giver",
        stars: 1,
        author: "idk",
        recommended: false
    },
    
    {
        title: "uh",
        stars: 4,
        author: "whomst",
        recommended: true
    },
    
    {
        title: "uhhhh",
        stars: 3,
        author: "why",
        recommended: true
    }
];
for (var a = 0; a < 3; a++) {
    
    // draw shelf
    fill(173, 117, 33);
    rect(0, a*120+120, width, 10);
    for (var b = 0; b < 3; b++) {
        // draw one book
        fill(random(0,255),random(0,255),random(0,255));
        rect(10+a*145, 20+b*120, 90, 100);
        fill(0, 0, 0);
        text(book[b].title, 15+a*145, 29+b*120, 70, 100);
        text("author:", 15+a*145, 45+b*120, 70, 100);
        text(book[b].author, 15+a*145, 60+b*120, 70, 100);
        if (book[b].recommended === true)
        {
            text("recommended",15+a*145, 80+b*120, 70, 100);
        }
        for (var i = 0; i < book[b].stars; i++) {
            image(getImage("cute/Star"), (13+a*145+i*20), 90+b*120, 20, 30);
        }
    }
}
