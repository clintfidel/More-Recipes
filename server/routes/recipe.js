import express from 'express';
import RecipeController from '../controllers/recipe';
import { checkUserInput, verifyUserId, verifyUserIdExist, verifyRecipeId,
  recipeNameExist, verifyRecipe, checkReviewsInput, downVote, upVote } from '../middlewares/Validation';
import { isLoggedIn, } from '../middlewares/Authorization';

const app = express.Router();

// Add recipes route
app.route('/')
  .post(isLoggedIn, checkUserInput, recipeNameExist, RecipeController.addRecipe);


// Get all Recipes
app.route('/')
  .get(isLoggedIn, RecipeController.getRecipe);

// Delete a recipe
app.route('/:recipeId')
  .delete(isLoggedIn, RecipeController.deleteARecipe);

// Modify a recipe
app.route('/:recipeId')
  .put(isLoggedIn, RecipeController.modifyRecipe);


// Add favourite recipe
app.route('/favourites/:recipeId')
  .post(isLoggedIn, RecipeController.favouriteRecipe);

// Get favourite recipe
app.route('/favourites/:userId')
  .get(isLoggedIn, RecipeController.getFavouriteRecipes);


// upVote a recipe
app.route('/upvote/:recipeId')
  .post(isLoggedIn, upVote, RecipeController.upVoteRecipe);

// downVote a recipe
app.route('/downvote/:recipeId')
  .post(isLoggedIn, downVote, RecipeController.downVoteRecipe);

// get all upvote
app.route('/upvote/:recipeId')
  .post(isLoggedIn, downVote, RecipeController.getUpVoteRecipe);

// get all downvote
app.route('/downvote/:recipeId')
  .post(isLoggedIn, downVote, RecipeController.getDownVoteRecipe);

// get all upvote
app.route('/upvote/:recipeId')
  .post(isLoggedIn, downVote, RecipeController.getUpVoteRecipe);

// get all upvote in descending order
app.route('/recipes?sort=upvotes&order=descending')
  .get(isLoggedIn, downVote, RecipeController.getUpVoteRecipe);


// review a recipe
app.route('/reviews/:recipeId')
  .post(
    isLoggedIn, checkReviewsInput, verifyRecipeId, verifyUserIdExist,
    verifyRecipe, verifyUserId, RecipeController.reviewRecipe
  );

// view recipes
app.route('/views/:recipeId')
  .post(isLoggedIn, verifyRecipe, RecipeController.viewRecipes);


export default app;
