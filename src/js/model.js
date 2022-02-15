// import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { TIME_OUT_SEC } from './config';
import { RESULT_PER_PAGE } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const state = {
  recipe: {},
  search: {
    query: '',
    result: [],
    page: 1,
    resultPerPage: RESULT_PER_PAGE,
  },
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
  };
};

export const loadRecipe = async function (id) {
  try {
    const fetchPromise = fetch(`${API_URL}${id}`);
    const res = await Promise.race([fetchPromise, timeout(TIME_OUT_SEC)]);
    const data = await res.json();

    state.recipe = createRecipeObject(data);
  } catch (error) {
    throw error;
  }
};

export const loadSearchResult = async function (query) {
  try {
    state.search.query = query;

    const fetchPromise = fetch(`${API_URL}?search=${query}`);
    const res = await Promise.race([fetchPromise, timeout(TIME_OUT_SEC)]);
    const data = await res.json();

    if (data.results === 0) throw new Error();
    state.search.result = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
        ...(recipe.key && { key: recipe.key }),
      };
    });
  } catch (error) {
    throw error;
  }
};

export const getSearchResultPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * RESULT_PER_PAGE;
  const end = page * RESULT_PER_PAGE;
  return state.search.result.slice(start, end);
};

console.log(state);
