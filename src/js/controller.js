import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultView from './views/resultView';
import paginationView from './views/paginationView';
import bookmarkView from './views/bookmarkView';
import addRecipeView from './views/addRecipeView';
import { MODAL_CLOSE_SEC } from './config';

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

    // update the result view to show the selected recipe
    resultView.update(model.getSearchResultPage());

    bookmarkView.update(model.state.bookmarks);

    // LOAD DATA INTO RECIPE OBJECT
    await model.loadRecipe(id);

    // SEND LOADED DATA TO VIEW TO RENDER
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError(error.message);
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

    //render result to view
    resultView.render(model.getSearchResultPage());

    paginationView.render(model.state.search);
  } catch (error) {
    resultView.renderError();
  }
};

const controlPagination = function (goToPage) {
  // 1) Render NEW results
  resultView.render(model.getSearchResultPage(goToPage));

  // 2) Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (updateTo) {
  model.updateServings(updateTo);

  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);

  recipeView.update(model.state.recipe);

  bookmarkView.render(model.state.bookmarks);
};

const controlBookmark = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (formData) {
  try {
    addRecipeView.renderSpinner();

    await model.uploadRecipe(formData);

    recipeView.render(model.state.recipe);

    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarkView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
      addRecipeView.renderForm();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (error) {
    addRecipeView.renderError(error.message);
  }
};

const init = function () {
  bookmarkView.addHandlerRender(controlBookmark);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerPagination(controlPagination);
  addRecipeView.addHandlerAddRecipe(controlAddRecipe);
};

init();
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
