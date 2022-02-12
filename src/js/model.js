// import { async } from 'regenerator-runtime';
import { API_URL } from './config';

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  const res = await fetch(`${API_URL}${id}`);
  const data = await res.json();
  console.log(data);
};
