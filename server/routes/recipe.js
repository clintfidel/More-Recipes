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
  .get(Authorization.isLoggedIn, RecipeController.getRecipe);

// Delete a recipe
app.route('/:recipeId')
  .delete(Authorization.isLoggedIn, RecipeController.deleteARecipe);

// Modify a recipe
app.route('/:recipeId')
  .put(Authorization.isLoggedIn, RecipeController.modifyRecipe);


// Add favourite recipe
app.route('/favourites/:recipeId')
  .post(
    Authorization.isLoggedIn,
    RecipeController.favouriteRecipe
  );

// Get favourite recipe
app.route('/favourites/:userId')
  .get(
    Authorization.isLoggedIn,
    RecipeController.getFavouriteRecipes
  );


// upVote a recipe
app.route('/upvote/:recipeId')
  .post(
    Authorization.isLoggedIn, Validation.upVote,
    RecipeController.upVoteRecipe
  );

// downVote a recipe
app.route('/downvote/:recipeId')
  .post(Authorization.isLoggedIn, Validation.downVote, RecipeController.downVoteRecipe);

// get all upvote
app.route('/upvote/:recipeId')
  .post(Authorization.isLoggedIn, Validation.downVote, RecipeController.getUpVoteRecipe);

// get all downvote
app.route('/downvote/:recipeId')
  .post(Authorization.isLoggedIn, Validation.downVote, RecipeController.getDownVoteRecipe);

// get all upvote
app.route('/upvote/:recipeId')
  .post(Authorization.isLoggedIn, Validation.downVote, RecipeController.getUpVoteRecipe);

// get all upvote in descending order
app.route('/recipes?sort=upvotes&order=descending')
  .get(Authorization.isLoggedIn, Validation.downVote, RecipeController.getUpVoteRecipe);


// review a recipe
app.route('/reviews/:recipeId')
  .post(
    Authorization.isLoggedIn, Validation.checkReviewsInput, Validation.verifyRecipeId,
    Validation.verifyUserIdExist,
    Validation.verifyRecipe, Validation.verifyUserId, RecipeController.reviewRecipe
  );

// view recipes
app.route('/views/:recipeId')
  .post(
    Authorization.isLoggedIn, Validation.verifyRecipe,
    RecipeController.viewRecipes
  );


export default app;
