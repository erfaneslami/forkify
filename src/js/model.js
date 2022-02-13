// import { async } from 'regenerator-runtime';
import { API_URL } from './config';

export const state = {
  recipe: {},
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
    const res = await fetch(`${API_URL}${id}`);
    const data = await res.json();

    state.recipe = createRecipeObject(data);
  } catch (error) {
    throw error;
  }
};
