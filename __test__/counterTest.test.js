import Counter from '../src/modules/Counter.js';

const counter = new Counter();

describe('Testing the comment counter', () => {
  test('comment counting test.', () => {
    const comments = [
      {
        username: 'Yohanna',
        comment: 'This food looks delicious.',
        creation_date: '2022-06-23',
      },
      {
        username: 'Yohanna',
        comment: 'This food looks delicious.',
        creation_date: '2022-06-23',
      },
      {
        username: 'Yohanna',
        comment: 'This food looks delicious.',
        creation_date: '2022-06-23',
      },
    ];
    expect(counter.commentCounter(comments)).toBe(3);
  });

  test('no comment counting test', () => {
    const comments = {
      error: {
        status: 400,
        message: "'item_id' not found.",
      },
    };
    expect(counter.commentCounter(comments)).toBe(0);
  });
});

describe('Testing the food category and dishes count', () => {
  test('category counting test.', () => {
    const categories = {
      meals: [
        {
          strCategory: 'Beef',
        },
        {
          strCategory: 'Breakfast',
        },
        {
          strCategory: 'Chicken',
        },
        {
          strCategory: 'Dessert',
        },
        {
          strCategory: 'Goat',
        },
      ],
    };
    expect(counter.categoryCounter(categories)).toBe(5);
  });

  test('dishes counting test.', () => {
    const mealCategories = {
      meals: [
        {
          strMeal: 'Beef and Mustard Pie',
          strMealThumb: 'https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg',
          idMeal: '52874',
        },
        {
          strMeal: 'Beef and Oyster Pie',
          strMealThumb: 'https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg',
          idMeal: '52874',
        },
        {
          strMeal: 'Beef Banh Mi Bowls with Sriracha Mayo, Carrot & Pickled Cucumber',
          strMealThumb: 'https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg',
          idMeal: '52874',
        },
        {
          strMeal: 'Beef Bourguignon',
          strMealThumb: 'https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg',
          idMeal: '52874',
        },
      ],
    };
    expect(counter.mealCounter(mealCategories)).toBe(4);
  });
});