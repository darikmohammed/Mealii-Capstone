class MealAPI {
  constructor() {
    this.baseURL = 'https://www.themealdb.com/api/json/v1/1/';
  }

  receiveData = async () => {
    const response = await fetch(`${this.baseURL}list.php?c=list`, {
      method: 'GET',
      header: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const allMealsCatagory = await response.json();
    return allMealsCatagory;
  };

  generateMeals = async (mealCatagory) => {
    const response = await fetch(
      `${this.baseURL}filter.php?c=${mealCatagory}`,
      {
        method: 'GET',
        header: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    );
    const allMeals = await response.json();
    return allMeals;
  };
}

module.exports = MealAPI;
