var u = {
    title: "water",
    servings: 2,
    ingredients: ["frozen water", " Water"]
};

fill(26, 26, 26);
textSize(20);
text(u.title, 10, 23);
text("Serves: " + u.servings, 10, 55);
text("Ingredients: " + u.ingredients, 10, 85);
