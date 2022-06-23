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

const likeEventButton = () => {
  // create an event listener for the like buttons
  const likeButtons = document.querySelectorAll('.like-description');
  likeButtons.forEach((likeButton) => {
    likeButton.addEventListener('click', async () => {
      console.log('tested...');
      await involvementAPI.postLike(likeButton.getAttribute('id'));

      const likes = await involvementAPI.getLikes();
      const item = likes.find(
        (element) => element.item_id === likeButton.getAttribute('id')
      );
      const updatelike = document.querySelector(
        `.count-likes-${likeButton.getAttribute('id')}`
      );
      updatelike.textContent = `${item.likes} Likes`;
    });
  });
};

// EventListener for the commentbutton
const commentEventButton = () => {
  const commentButtons = document.querySelectorAll('.comment-btn');
  commentButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      modal.style.display = 'block';
      const meals = await mealAPI.getMealDetail(button.getAttribute('id'));
      document.querySelector(
        '.meal-thumb'
      ).innerHTML = `<img src="${meals.meals[0].strMealThumb}"
      alt="${meals.meals[0].strMeal}">`;
      document.querySelector('.meal-title').textContent =
        meals.meals[0].strMeal;
      document.querySelector(
        '.meal-category'
      ).textContent = `${meals.meals[0].strCategory}, ${meals.meals[0].strArea}`;
      document.querySelector('.meal-instructions').textContent =
        meals.meals[0].strInstructions;
      document.querySelector(
        '.meal-youtube'
      ).innerHTML = `<a href="${meals.meals[0].strYoutube}"><i
        class="fa-brands fa-youtube"></i>
    <p>YouTube</p>
</a>`;
      const tags = meals.meals[0].strTags.split(',');
      const ulTags = document.querySelector('.meal-tags ul');
      ulTags.innerHTML = '';
      tags.forEach((tag) => {
        ulTags.innerHTML += `<li>${tag}</li>`;
      });
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
  allMeal.meals.forEach(async (meal) => {
    const likes = await involvementAPI.getLikes();
    let item = likes.find((element) => element.item_id === meal.idMeal);
    if (item === undefined) {
      item = {
        likes: 0,
      };
    }
    Meals.innerHTML += `<div class="card">
    <img id="meal-img" src="${meal.strMealThumb}" alt="${meal.strMeal}">
    <div class="description">
    <h3>${meal.strMeal}</h3>
      <div class ="like-description" id="${meal.idMeal}">
        <span><i id="like-icon" class="fa-solid fa-heart"></i></span>
        <span id="count-likes" class="count-likes-${meal.idMeal}">${item.likes} Likes<span>
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
        mealButton.getAttribute('id')
      );
      Meals.innerHTML = '';
      mealCategoryHeader.textContent = `Our ${mealButton.getAttribute(
        'id'
      )} Meal Category`;
      allMeal.meals.forEach(async (meal) => {
        const likes = await involvementAPI.getLikes();
        let item = likes.find((element) => element.item_id === meal.idMeal);
        if (item === undefined) {
          item = {
            likes: 0,
          };
        }
        Meals.innerHTML += `<div class="card">
        <img id="meal-img" src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <div class="description">
        <h3>${meal.strMeal}</h3>
          <div class="like-description" id="${meal.idMeal}">
            <span id="like-icon"><i class="fa-solid fa-heart"></i></span>
            <span id="count-likes" class="count-likes-${meal.idMeal}">${item.likes} Likes<span>
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
