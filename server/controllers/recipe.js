import models from '../models/index';
import { reviewRecipeNotication } from '../middlewares/Validation';

const {
  Recipe, Review, Favourite, Vote
} = models;

export default {
  addRecipe(req, res) {
    const { recipeName } = req.body;
    return Recipe
      .findOne({ where: { recipeName } })
      .then((recipe) => {
        if (!recipe) {
          return Recipe
            .create(req.userInput)
            .then(() => {
              res.send({
                status: 'Success',
                message: 'Recipe inserted succesfully'
              });
            });
        }

        res.status(409).json({ message: 'Recipe name already exist' });
      })
      .catch(error => res.status(400).send({
        message: error
      }));
  },

  getRecipe(req, res) {
    const pageNumber = Number(req.query.myPage);
    const limit = 15;
    let offset;
    let page;
    const message = 'Sorry no recipe found for this page';
    if (pageNumber === 0) {
      offset = 0;
    } else {
      page = pageNumber;
      offset = limit * (page - 1);
    }
    Recipe
      .findAndCountAll({
        order: [['views', req.query.order || 'ASC']],
        attributes: ['id', 'recipeName', 'votes', 'views'],
        include: [{
          model: models.User,
          attributes: ['username', 'email', 'updatedAt']
        }],
        limit,
        offset,
      })
      .then((recipes) => {
        const pages = Math.ceil(recipes.count / limit);
        if (!recipes.count) {
          return res.status(404).send('No recipe found');
        } else if (pageNumber > pages) {
          return res.status(404).send(message);
        }
        return res.status(200).json({ recipes, count: recipes.count, pages });
      })
      .catch(() => res.status(500).send('Internal sever Error'));
  },

  searchRecipe(req, res) {
    const query = req.query.search;
    return Recipe
      .findAll({
        where: {
          $or: [
            {
              recipeName: { $iLike: `%${query}%` }
            },
            {
              ingredients: { $iLike: `%${query}%` }
            }
          ]
        },
        include: [{
          model: models.User,
          attributes: ['id', 'username', 'email', 'updatedAt']
        }]
      })
      .then((recipe) => {
        if (recipe.length < 1) {
          res.status(404).send('no match recipe found');
        } else {
          res.status(200).json({
            mesage: 'recipe found',
            recipe
          });
        }
      })
      .catch(() => res.status(500).send('Internal sever error'));
  },

  deleteARecipe(req, res) {
    Recipe
      .findById(req.params.recipeId)
      .then((currentRecipe) => {
        const { userId } = req.decoded.currentUser;
        if (currentRecipe.userId !== parseInt(userId, 10)) {
          return res.status(403).send({
            message: 'sorry! you can only delete your own recipe'
          });
        }
      });

    return Recipe
      .destroy({
        where: {
          id: req.params.recipeId,
          userId: req.decoded.currentUser.userId
        }
      })
      .then((recipe) => {
        if (recipe) {
          return res.status(200).send({
            message: 'Recipe deleted successfully'
          });
        }
        res.status(404).send({
          message: 'No recipe found in the database...'
        });
      })
      .catch(() => res.status(500).send('Internal sever Error'));
  },

  modifyRecipe(req, res) {
    Recipe
      .findById(req.params.recipeId)
      .then((currentRecipe) => {
        const { userId } = req.decoded.currentUser;
        if (currentRecipe.userId !== parseInt(userId, 10)) {
          return res.status(403).send({
            message: 'you can only modify your own recipe'
          });
        }
      });

    return Recipe
      .update(req.body, {
        where: {
          id: req.params.recipeId,
          userId: req.decoded.currentUser.userId
        }
      })
      .then((newRecipe) => {
        if (!newRecipe) {
          return res.status(404).send({
            message: 'no recipe found'
          });
        }
        return res.status(200).send({
          message: 'recipe modified successfully',
          data: {
            recipeName: newRecipe.recipeName,
            ingredients: newRecipe.ingredients,
            descriptions: newRecipe.descriptions,
            userId: newRecipe.decoded.currentUser.userId
          }
        });
      })

      .catch(() => res.status(500).send('Internal sever Error'));
  },

  reviewRecipe(req, res) {
    Review
      .findOne({
        where: {
          recipeId: req.params.recipeId,
          userId: req.decoded.currentUser.userId
        },
        include: [{
          model: models.User,
          attributes: ['username', 'email', 'updatedAt']
        }]
      })
      .then(() => Review
        .create(req.reviewInput)
        .then(recipe => res.status(200).send({
          status: 'success',
          message: 'Review added successfully',
          data: { userId: recipe.decoded.currentUser.userId, recipeId: recipe.recipeId }
        }))
        .then(() => {
          reviewRecipeNotication(req);
        })
        .catch(() => {
          res.status(500).send('Internal server error');
        }));
  },
  getReview(req, res) {
    return Review
      .findAll({
        where: {
          recipeId: req.params.recipeId
        },
        include: [{
          model: models.User,
          attributes: ['username', 'email', 'updatedAt']
        }]
      })
      .then((reviews) => {
        if (!reviews) {
          return res.status(404).send({
            status: 'fail',
            message: 'no recipe found '
          });
        }
        return res.status(200).json({
          reviews,
          message: 'reviews found'
        });
      });
  },


  favouriteRecipe(req, res) {
    if (!req.decoded.currentUser.userId || !req.params.recipeId) {
      res.status(401).send({
        message: 'Access denied!'
      });
    }
    return Favourite
      .findOne({
        where: {
          recipeId: req.params.recipeId,
          userId: req.decoded.currentUser.userId
        }
      })
      .then(() => Favourite
        .create({
          userId: req.decoded.currentUser.userId,
          recipeId: req.params.recipeId
        })
        .then(() => res.status(200).send({
          message: 'Favourite added successfully'
        }))
        .catch(error => res.status(400).send(error)));
  },

  getFavouriteRecipes(req, res) {
    return Favourite
      .findAll({
        where: {
          userId: req.decoded.currentUser.userId
        },
        include: [{
          model: models.Recipe,
          attributes: ['recipeName', 'ingredients', 'views', 'votes'],
          include: [{
            model: models.User,
            attributes: ['fullName', 'updatedAt']
          }]
        }]
      })
      .then((recipe) => {
        if (recipe.length < 1) {
          res.status(404).json({
            message: 'No favorite recipe found'
          });
        } else {
          res.status(200).json(recipe);
        }
      })
      .catch(error => res.status(404).json(error));
  },

  upVoteRecipe(req, res) {
    Recipe
      .findOne({
        where: {
          id: req.params.recipeId
        }
      })
      .then((vote) => {
        if (!vote) {
          return res.status(404).send({
            message: 'no recipe found to be upvoted'
          });
        }

        if (req.message !== 'destroyed') {
          vote.increment('votes')
            .then(() => vote.reload());
        }
        if (req.message === 'created') {
          return res.status(200).send({
            message: 'upvote successful'
          });
        } else if (req.message === 'updated') {
          return res.status(200).send({
            message: 'vote updated successfully'
          });
        } else if (req.message === 'destroyed') {
          vote.decrement('votes')
            .then(() => vote.reload());
          return res.status(200).send({
            message: 'vote removed successfully'
          });
        }
      });
  },

  downVoteRecipe(req, res) {
    return Recipe
      .findOne({
        where: {
          id: req.params.recipeId
        }
      })
      .then((vote) => {
        if (vote.length < 1) {
          return res.status(404).send({
            message: 'no recipe found to be downvoted'
          });
        }
        if (req.message !== 'destroyed') {
          vote.decrement('votes')
            .then(() => vote.reload());
        }
        if (req.message === 'created') {
          return res.status(200).send({
            message: 'downvote successful'
          });
        } else if (req.message === 'updated') {
          return res.status(200).send({
            message: 'vote updated successfully'
          });
        } else if (req.message === 'destroyed') {
          vote.increment('votes')
            .then(() => vote.reload());
          return res.status(200).send({
            message: 'vote removed successfully'
          });
        }
      });
  },

  getUpVoteRecipe(req, res) {
    return Vote
      .findAll({
        where: {
          recipeId: req.params.recipeId
        },
        include: [{
          model: models.Recipe,
          attributes: ['recipeName', 'views']
        }],
        attributes: ['userId', 'upvote']
      })
      .then((display) => {
        if (display === null) {
          return res.statu(400).json({
            message: 'no recipe found'
          });
        }
        res.status(200).json(display);
      })
      .catch(error => res.status(404).send(error));
  },

  getDownVoteRecipe(req, res) {
    return Vote
      .findAll({
        where: {
          recipeId: req.params.recipeId
        },
        attributes: ['userId', 'downvote'],
        include: [{
          model: models.Recipe,
          attributes: ['recipeName', 'views']
        }]
      })
      .then((display) => {
        res.status(200).json(display);
      })
      .catch(error => res.status(404).send(error));
  },

  getAllUpVoteCount(req, res) {
    Vote
      .findAndCountAll({
        where: {
          upvote: 1,
          recipeId: req.params.recipeId
        },
      })
      .then((result) => {
        const upvote = { recipeId: req.params.recipeId, upvote: result.count };
        console.log(upvote);
        return res.status(200).json(upvote);
      });
  },

  getAllDownVoteCount(req, res) {
    Vote
      .findAndCountAll({
        where: {
          downvote: 1,
          recipeId: req.params.recipeId
        },
      })
      .then((result) => {
        const downvote = { recipeId: req.params.recipeId, downvote: result.count };
        return res.status(200).json(downvote);
      });
  },

  viewRecipes(req, res) {
    return Recipe
      .findOne({
        where: {
          id: req.params.recipeId
        }
      })
      .then((view) => {
        if (!view) {
          return res.status(404).send({
            message: 'no recipe found to be viewed'
          });
        }
        view.increment('views')
          .then(() => view.reload());
        return res.status(200).send({
          status: ' successful',
          data: {
            recipeName: view.recipeName,
            ingredients: view.ingredients,
            descriptions: view.descriptions,
            userId: view.decoded.currentUser.userId
          }
        });
      })
      .catch(error => res.status(403).send(error));
  }
};
