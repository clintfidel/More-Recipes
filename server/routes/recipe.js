import express from 'express';
import RecipeController from '../controllers/recipe';
import { checkUserInput, verifyUserId, verifyUserIdExist, verifyRecipeId,
  verifyRecipe, checkReviewsInput, downVote, upVote } from '../middlewares/Validation';
import { isLoggedIn } from '../middlewares/Authorization';

const app = express.Router();

// Add recipes route
app.route('/')
  .post(isLoggedIn, checkUserInput, verifyUserIdExist, RecipeController.addRecipe);

// Get all Recipes
app.route('/')
  .get(isLoggedIn, RecipeController.getRecipe);

// Delete a recipe
app.route('/:recipeId')
  .delete(isLoggedIn,verifyUserId, RecipeController.deleteARecipe);

// Modify a recipe
app.route('/:recipeId')
  .put(isLoggedIn, verifyUserId, RecipeController.modifyRecipe);


// Add favourite recipe
app.route('/favourites/:recipeId')
  .post(isLoggedIn, RecipeController.favouriteRecipe);

// Get favourite recipe
app.route('/favourites')
  .get(isLoggedIn, RecipeController.getFavouriteRecipes);

// search for recipe
app.route('/recipes')
  .get(isLoggedIn, RecipeController.searchRecipe);

// upVote a recipe
app.route('/upvote/:recipeId')
  .post(isLoggedIn, verifyRecipe, upVote, RecipeController.upVoteRecipe);

// downVote a recipe
app.route('/downvote/:recipeId')
  .post(isLoggedIn, verifyRecipe, downVote, RecipeController.downVoteRecipe);

// get all upvote
app.route('/upvote/:recipeId')
  .get(isLoggedIn, RecipeController.getUpVoteRecipe);

// get all downvote
app.route('/downvote/:recipeId')
  .get(isLoggedIn, RecipeController.getDownVoteRecipe);

// get the total number of upvotes
app.route('/getUpVotes/:recipeId')
  .get(isLoggedIn, RecipeController.getAllUpVoteCount);


// get the total number of downvotes
app.route('/getDownVotes/:recipeId')
  .get(isLoggedIn, RecipeController.getAllDownVoteCount);

// review a recipe
app.route('/reviews/:recipeId')
  .post(
    isLoggedIn, checkReviewsInput, verifyRecipeId, verifyUserIdExist,
    verifyRecipe, verifyUserId, RecipeController.reviewRecipe
  );

app.route('/reviews/:recipeId')
  .get(isLoggedIn, RecipeController.getReview);

// view recipes
app.route('/views/:recipeId')
  .post(isLoggedIn, verifyRecipe, RecipeController.viewRecipes);


export default app;
