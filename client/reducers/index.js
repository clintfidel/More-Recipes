import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import RecipeReducer from './RecipeReducer';

const rootReducer = combineReducers({
  AuthReducer,
  RecipeReducer
});

export default rootReducer;
