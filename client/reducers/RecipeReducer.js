import { ADD_RECIPE, DELETE_RECIPE, RECIPE_ERROR } from '../actions/types';


const INITIAL_STATE = {
  recipe: { userRecipe: {} },
  authenticated: false,
  error: ''
};

function RecipeReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_RECIPE:
      return { ...state, recipe: action.recipe };
    default:
      return state;
  }
}
export default RecipeReducer;

