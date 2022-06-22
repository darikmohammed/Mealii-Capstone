import './style.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

import MealAPI from './modules/mealAPI.js';

const Meals = document.querySelector('#cards');
const mealCategoryHeader = document.querySelector('#meals-category-header');
const mealAPI = new MealAPI();

// EventListener for the commentbutton
const commentEventButton = () => {
  const commentButtons = document.querySelectorAll('.comment-btn');
  const modal = document.querySelector('.modal');
  commentButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      modal.style.display = 'block';
      const meals = await mealAPI.getMealDetail(button.getAttribute('id'));
      console.log(meals);
    });
  });
};

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

  const allMeal = await mealAPI.generateMeals('Beef');
  Meals.innerHTML = '';
  mealCategoryHeader.textContent = 'Our Beef Meal Category';
  allMeal.meals.forEach((meal) => {
    Meals.innerHTML += `<div class="card">
    <img id="meal-img" src="${meal.strMealThumb}" alt="${meal.strMeal}">
    <div class="description">
    <h3>${meal.strMeal}</h3>
      <div id="like-description">
        <span><i id="like-icon" class="fa-solid fa-heart"></i></span>
        <span>5 likes<span>
      </div>
    </div> <br>
    <button class="comment-btn" id="${meal.idMeal}">Comment</button>
</div>`;
  });

  commentEventButton();

  // create an event listener for the meal buttons
  const mealButtons = document.querySelectorAll('.catagory-button');
  mealButtons.forEach((mealButton) => {
    mealButton.addEventListener('click', async () => {
      const allMeal = await mealAPI.generateMeals(
        mealButton.getAttribute('id')
      );
      Meals.innerHTML = '';
      mealCategoryHeader.textContent = `Our ${mealButton.getAttribute(
        'id'
      )} Meal Category`;
      allMeal.meals.forEach((meal) => {
        Meals.innerHTML += `<div class="card">
        <img id="meal-img" src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <div class="description">
        <h3>${meal.strMeal}</h3>
          <div id="like-description">
            <span><i id="like-icon" class="fa-solid fa-heart"></i></span>
            <span>5 likes<span>
          </div>
        </div> <br>
        <button class="comment-btn" id="${meal.idMeal}">Comment</button>
    </div>`;
      });
      // create an event listener for the comment buttons
      commentEventButton();
    });
  });
};

displayCatagories();
