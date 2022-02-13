import * as model from './model';
import recipeView from './views/recipeView';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

import icons from 'url:../img/icons.svg'; // Parcel 2

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const controlRecipe = async function (id) {
  try {
    await model.loadRecipe('5ed6604591c37cdc054bc886');

    console.log(model.state.recipe);
    recipeView.render(model.state.recipe);
  } catch (error) {
    console.log(error);
  }
};

const init = function () {
  controlRecipe();
};

init();
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
