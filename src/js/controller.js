import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultView from './views/resultView';

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

const controlSearchResult = async function () {
  try {
    // get query from view
    const query = searchView.getQuery();
    if (!query) return;

    resultView.renderSpinner();

    // get results and store them into state
    await model.loadSearchResult(query);

    console.log(model.state.search.result);
    //render result to view
    resultView.render(model.state.search.result);
  } catch (error) {
    resultView.renderError();
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResult);
};

init();
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
