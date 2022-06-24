class Counter {
  commentCounter = (comments) => {
    let commentCount = 0;
    if (!comments.error) {
      commentCount = comments.length;
    }
    return commentCount;
  };

  // Category count
  categoryCounter = (catagories) => {
    const categoryCount = catagories.meals.length;
    return categoryCount;
  };

  // Meal count
  mealCounter = (dishes) => {
    const dishesCount = dishes.meals.length;
    return dishesCount;
  };
}

module.exports = Counter;
