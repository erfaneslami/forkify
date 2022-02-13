import * as model from './model';
import recipeView from './views/recipeView';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

import icons from 'url:../img/icons.svg'; // Parcel 2

const recipeContainer = document.querySelector('.recipe');

const controlRecipe = async function (id) {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    // RENDER THE SPINNER
    recipeView.renderSpinner();

    // LOAD DATA INTO RECIPE OBJECT
    await model.loadRecipe(id);

    console.log(model.state.recipe);

    // SEND LOADED DATA TO VIEW TO RENDER
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
    console.log(error);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
};

init();
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
