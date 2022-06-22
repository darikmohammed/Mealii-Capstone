import './style.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

import MealAPI from './modules/mealAPI';

const Meals = document.querySelector('#cards');

const mealAPI = new MealAPI();

const displayCatagories = async () => {
  const catagories = await mealAPI.receiveData();
  const catagoriesList = document.querySelector(
    '.meal-catagories-list .meal-catagories'
  );
  catagoriesList.innerHTML = '';
  catagories.meals.forEach((catagory) => {
    catagoriesList.innerHTML += `<li>
    <a href="#" class="catagory-button" id="${catagory.strCategory}">${catagory.strCategory}</a>
</li>`;
  });
  //create an event listener for the meal buttons

  const mealButtons = document.querySelectorAll('.catagory-button');
  mealButtons.forEach((mealButton) => {
    mealButton.addEventListener('click', async () => {
      const allMeal = await mealAPI.generateMeals(
        mealButton.getAttribute('id')
      );
      Meals.innerHTML = '';
      allMeal.meals.forEach((meal) => {
        Meals.innerHTML += `<div class="card col-4">
        <img id="meal-img" src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <div class="description">
        <h3>${meal.strMeal}</h3>
          <div id="like-description">
            <span><i id="like-icon" class="fa-solid fa-heart"></i></span>
            <span>5 likes<span>
          </div>
        </div>
        <button class="comment-btn" id="${meal.idMeal}">Comment</button>
    </div>`;
      });
      // create an event listener for the comment buttons

      const commentButtons = document.querySelectorAll('.comment-btn');
      commentButtons.forEach((button) => {
        console.log(button.getAttribute('id'));
      });
    });
  });
};
displayCatagories();
