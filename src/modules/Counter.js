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
    let categoryCount = 0;
    if (!catagories.error) {
      categoryCount = catagories.length;
    }
    return categoryCount;
  };

  // Meal count
  mealCounter = (dishes) => {
    let dishesCount = 0;
    if (!dishes.error) {
      dishesCount = dishes.length;
    }
    return dishesCount;
  };
}

module.exports = Counter;
