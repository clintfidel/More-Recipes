import db from '../models/index';

const {
  Review, Recipe, User, Vote
} = db;

export default {
  checkUserInput(req, res, next) {
    req.checkBody({
      recipeName: {
        notEmpty: true,
        errorMessage: 'Recipe Name is required'
      },
      descriptions: {
        notEmpty: true,
        errorMessage: 'Please add recipe description'
      },
      instructions: {
        notEmpty: true,
        errorMessage: 'Please provide a guide'
      },
      ingredients: {
        notEmpty: true,
        errorMessage: 'Give lists of recipe ingredients'
      },
      userId: {
        notEmpty: true,
        errorMessage: 'User Id is required'
      }
    });
    const errors = req.validationErrors();
    if (errors) {
      const allErrors = [];
      errors.forEach((error) => {
        allErrors.push({
          error: error.msg
        });
      });
      return res.status(409)
        .json(allErrors);
    }
    req.userInput = {
      recipeName: req.body.recipeName,
      instructions: req.body.instructions,
      ingredients: req.body.ingredients,
      descriptions: req.body.descriptions,
      views: req.body.views,
      votes: req.body.votes,
      userId: req.body.userId
    };
    next();
  },

  verifyUserId(req, res, next) {
    Recipe
      .findOne({
        where: {
          userId: req.body.userId
        }
      })
      .then((user) => {
        if (user) {
          res.status(403).send({
            status: 'failed',
            message: 'this user cannot perform this operation more than once'
          });
        } else {
          next();
        }
      });
  },

  verifyUserIdExist(req, res, next) {
    User
      .findOne({
        where: {
          id: req.body.userId
        }
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'your userId doesnt exist in the database'
          });
        }
        next();
      })
      .catch(error => res.status(404).send(error.errors));
  },

  verifyRecipeId(req, res, next) {
    Review
      .findOne({
        where: {
          recipeId: req.params.recipeId
        }
      })
      .then((recipe) => {
        if (recipe) {
          return res.status(401).send({
            message: 'you cannot review the same recipe more than one'
          });
        }

        next();
      })
      .catch(error => res.status(403).send(error.errors));
  },

  recipeNameExist(req, res, next) {
    Recipe
      .findOne({
        where: {
          recipeName: req.body.recipeName
        }
      })
      .then((name) => {
        if (name) {
          return res.status(400).json({
            error: 'recipe name already exist in database'
          });
        }
        next();
      })
      .catch(() => res.status(401).send({
        error: 'pls supply the name of the recipe'
      }));
  },


  verifyRecipe(req, res, next) {
    Recipe
      .findOne({
        where: {
          id: req.params.recipeId
        }
      })
      .then((recipe) => {
        if (recipe) {
          next();
        } else {
          return res.status(404).send({
            message: 'no recipe found'
          });
        }
      })
      .catch(() => res.status(404).send({
        status: false
      }));
  },

  checkReviewsInput(req, res, next) {
    req.checkBody({
      userId: {
        notEmpty: true,
        errorMessage: 'UserId is required'
      },
      content: {
        notEmpty: true,
        errorMessage: 'Please add reviews'
      },
    });
    const errors = req.validationErrors();
    if (errors) {
      const allErrors = [];
      errors.forEach((error) => {
        allErrors.push({
          error: error.msg
        });
      });
      return res.status(409)
        .json(allErrors);
    }
    console.log(req.body, '*******');
    req.reviewInput = {
      userId: req.body.userId,
      content: req.body.content,
      recipeId: req.params.recipeId
    };
    next();
  },

  downVote(req, res, next) {
    Vote
      .findOne({
        where: {
          $and: [
            { recipeId: req.params.recipeId },
            { userId: req.body.userId, }
          ]
        }
      })
      .then((found) => {
        if (found !== null && found.downvote) {
          return Vote.destroy({
            where: {
              $and: [
                { recipeId: req.params.recipeId },
                { userId: req.body.userId, }
              ]
            }
          }).then(() => {
            next();
          });
        } else if (found !== null && !found.downvote) {
          return found.update({
            upvote: 0,
            downvote: 1
          }).then(() => {
            next();
          });
        } else if (found === null) {
          return Vote.create({
            recipeId: req.params.recipeId,
            userId: req.body.userId,
            upvote: 0,
            downvote: 1
          }).then(() => {
            next();
          });
        }
      });
  },

  upVote(req, res, next) {
    Vote
      .findOne({
        where: {
          $and: [
            { recipeId: req.params.recipeId },
            { userId: req.body.userId, }
          ]
        }
      })
      .then((found) => {
        if (found !== null && found.upvote) {
          return Vote.destroy({
            where: {
              $and: [
                { recipeId: req.params.recipeId },
                { userId: req.body.userId, }
              ]
            }
          }).then(() => {
            req.message = 'destroyed';
            next();
          });
        } else if (found !== null && !found.upvote) {
          return found.update({
            upvote: 1,
            downvote: 0
          }).then(() => {
            req.message = 'updated';
            next();
          });
        } else if (found === null) {
          return Vote.create({
            recipeId: req.params.recipeId,
            userId: req.body.userId,
            upvote: 1,
            downvote: 0
          }).then(() => {
            req.message = 'created';
            next();
          });
        }
      });
  }
};
