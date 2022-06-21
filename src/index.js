import './style.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

import MealAPI from './modules/mealAPI';

const Meals = document.querySelector('#cards');

const mealAPI = new MealAPI(); 

const displayCatagories = async()=>{
  const catagories = await mealAPI.receiveData();
  console.log(catagories);
}
displayCatagories();
