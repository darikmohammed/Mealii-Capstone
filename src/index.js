import './style.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

import MealAPI from './modules/mealAPI.js';
import InvolvementAPI from './modules/InvolvementAPI.js';

const Meals = document.querySelector('#cards');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close-modal');
const mealCategoryHeader = document.querySelector('#meals-category-header');
const mealAPI = new MealAPI();
const involvementAPI = new InvolvementAPI();

// EventListener for the commentbutton
const commentEventButton = () => {
  const commentButtons = document.querySelectorAll('.comment-btn');
  commentButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      modal.style.display = 'block';
      const meals = await mealAPI.getMealDetail(button.getAttribute('id'));
      //   const comments = await involvementAPI.getComment(
      //     button.getAttribute('id'),
      //   );
      // add formbutton id
      document
        .querySelector('#comment-form button')
        .setAttribute('id', meals.meals[0].idMeal);
      document.querySelector(
        '.meal-thumb',
      ).innerHTML = `<img src="${meals.meals[0].strMealThumb}"
      alt="${meals.meals[0].strMeal}">`;
      document.querySelector('.meal-title').textContent = meals.meals[0].strMeal;
      document.querySelector(
        '.meal-category',
      ).textContent = `${meals.meals[0].strCategory}, ${meals.meals[0].strArea}`;
      document.querySelector('.meal-instructions').textContent = meals.meals[0].strInstructions;
      document.querySelector(
        '.meal-youtube',
      ).innerHTML = `<a href="${meals.meals[0].strYoutube}"><i
        class="fa-brands fa-youtube"></i>
    <p>YouTube</p>
</a>`;
    });
  });
};
// EventListener for the like button

const likeEventButton = () => {
  const likeButton = document.querySelectorAll('.like-meal');
  likeButton.forEach((button) => {
    button.addEventListener('click', async () => {
      await involvementAPI.postLike(button.getAttribute('id'));
      const statusUpdate = document.querySelector(
        `.new-like-status-${button.getAttribute('id')}`,
      );
      statusUpdate.innerHTML = 'Liked!';
      statusUpdate.style.display = 'block';
      statusUpdate.style.backgroundColor = '#39d42e';
      setTimeout(() => {
        statusUpdate.style.display = 'none';
      }, 5000);
      // update the like display
      const likes = await involvementAPI.getLikes();
      const item = likes.find(
        (element) => element.item_id === button.getAttribute('id'),
      );
      const likeDisplaySpan = document.querySelector(
        `#span-${button.getAttribute('id')}`,
      );
      likeDisplaySpan.innerHTML = `${item.likes} Likes`;
    });
  });
};

const displayCatagories = async () => {
  const catagories = await mealAPI.receiveData();
  const catagoriesList = document.querySelector(
    '.meal-catagories-list .meal-catagories',
  );
  catagoriesList.innerHTML = '';
  catagories.meals.forEach((catagory) => {
    catagoriesList.innerHTML += `<li>
    <a href="#" class="catagory-button" id="${catagory.strCategory}">${catagory.strCategory}</a>
</li>`;
  });

  const allMeal = await mealAPI.generateMeals('Beef');
  const likes = await involvementAPI.getLikes();
  Meals.innerHTML = '';
  mealCategoryHeader.textContent = 'Our Beef Meal Category';
  allMeal.meals.forEach((meal) => {
    let item = likes.find((element) => element.item_id === meal.idMeal);
    if (item === undefined) {
      item = {
        likes: 0,
      };
    }
    Meals.innerHTML += `<div class="card">
    <img id="meal-img" src="${meal.strMealThumb}" alt="${meal.strMeal}">
    <div class="description">
    <p class="new-like-status new-like-status-${meal.idMeal}">Created</p>
    <h3>${meal.strMeal}</h3>
      <div id="like-description">
        <span class="like-meal" id="${meal.idMeal}"><i id="like-icon" class="fa-solid fa-heart"></i></span>
        <span id="span-${meal.idMeal}">${item.likes} Likes<span>
      </div>
    </div> <br>
    <button class="comment-btn" id="${meal.idMeal}">Comment</button>
</div>`;
  });

  commentEventButton();
  likeEventButton();
  // create an event listener for the meal buttons
  const mealButtons = document.querySelectorAll('.catagory-button');
  mealButtons.forEach((mealButton) => {
    mealButton.addEventListener('click', async () => {
      const allMeal = await mealAPI.generateMeals(
        mealButton.getAttribute('id'),
      );
      const likes = await involvementAPI.getLikes();
      Meals.innerHTML = '';
      mealCategoryHeader.textContent = `Our ${mealButton.getAttribute(
        'id',
      )} Meal Category`;
      allMeal.meals.forEach((meal) => {
        let item = likes.find((element) => element.item_id === meal.idMeal);
        if (item === undefined) {
          item = {
            likes: 0,
          };
        }
        Meals.innerHTML += `<div class="card">
        <img id="meal-img" src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <div class="description">
    <p class="new-like-status new-like-status-${meal.idMeal}">Created</p>

        <h3>${meal.strMeal}</h3>
          <div id="like-description">
            <span class="like-meal" id="${meal.idMeal}"><i id="like-icon" class="fa-solid fa-heart"></i></span>
            <span id="span-${meal.idMeal}">${item.likes} Likes<span>
          </div>
        </div> <br>
        <button class="comment-btn" id="${meal.idMeal}">Comment</button>
    </div>`;
      });
      // create an event listener for the comment buttons
      commentEventButton();
      likeEventButton();
    });
  });
};

// Eventllistener for close modal button
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});
displayCatagories();

// Involvement API
const commentForm = document.querySelector('#comment-form');

commentForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.querySelector('#comment-form button').getAttribute('id');
  const name = document.querySelector('#comment-form input').value;
  const comment = document.querySelector('#comment-form textarea').value;
  const result = await involvementAPI.createComment(id, name, comment);
  document.querySelector('#comment-form textarea').value = '';
  document.querySelector('#comment-form input').value = '';
  const statusUpdate = document.querySelector('.new-comment-status');

  statusUpdate.innerHTML = `${result}! Sucessfully.`;
  statusUpdate.style.display = 'block';
  statusUpdate.style.backgroundColor = '#39d42e';
  setTimeout(() => {
    statusUpdate.style.display = 'none';
  }, 5000);
});
