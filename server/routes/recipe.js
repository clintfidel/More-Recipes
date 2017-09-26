import express from 'express';
import RecipeController from '../controllers/recipe';
import Validation from '../middlewares/Validation';
import Authorization from '../middlewares/Authorization';

const app = express.Router();

// Add recipes route
app.route('/')
  .post(Authorization.isLoggedIn, Validation.checkUserInput, RecipeController.addRecipe);


// Get all Recipes
app.route('/')
  .get(Authorization.isLoggedIn, RecipeController.getRecipe)

//Delete a recipe
app.route('/:recipeId')
  .delete(Authorization.isLoggedIn, RecipeController.deleteARecipe)

//Modify a recipe
app.route('/:recipeId')
  .put(Authorization.isLoggedIn, RecipeController.modifyRecipe)

//Review a recipe
app.route('/:recipeId/reviews')
  .post(Authorization.isLoggedIn, 
    Validation.checkReviewsInput, 
    RecipeController.reviewRecipe)

//Add favourite recipe
app.route('/favourites/:recipeId')
  .post(Authorization.isLoggedIn, 
    RecipeController.favouriteRecipe)

//Get favourite recipe
app.route('/favourites/:userId')
  .get(Authorization.isLoggedIn, 
    RecipeController.getFavourites)


//upVote a recipe
app.route('/upvote/:recipeId')
  .get(Authorization.isLoggedIn, 
    RecipeController.upVoteRecipe)

export default app;
