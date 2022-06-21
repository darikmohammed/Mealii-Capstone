class MealAPI {
  constructor() {
    this.baseURL = 'www.themealdb.com/api/json/v1/1/';
  }

  receiveData = async () => {
    const response = await fetch(
      'www.themealdb.com/api/json/v1/1/list.php?c=list',
      {
        method: 'GET',
        header: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );
    const allMeals = await response.json();
    return allMeals;
  };


}

module.exports = MealAPI;