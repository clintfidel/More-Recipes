import axios from 'axios';
import * as Types from './types';

export const addRecipe = recipe => ({
  types: Types.ADD_RECIPE,
  recipe
});

export const deleteRecipe = recipe => ({
  types: Types.DELETE_RECIPE,
  recipe
});

export const editRecipe = recipe => ({
  types: Types.EDIT_RECIPE,
  recipe
});

export const recipeError = error => ({
  types: Types.RECIPE_ERROR,
  error: error.message
});

export const addRecipeAction = recipeDetails => dispatch => axios
  .post('/api/v1/recipes/', recipeDetails)
  .then((res) => {
    const
  });

