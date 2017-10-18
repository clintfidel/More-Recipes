import db from '../models/index';

const {
  Recipe, Review, Favourite, Vote
} = db;

export default {

  addRecipe(req, res) {
    return Recipe
      .create(req.userInput)
      .then(() => {
        res.send({
          status: 'Success',
          message: 'Recipe inserted succesfully'
        });
      })
      .catch(error => res.status(400).send({
        status: false,
        message: error
      }));
  },

  getRecipe(req, res) {
    if (req.query.sort && req.query.order) {
      Recipe
        .findAll({
          order: [['views', 'DESC']],
          limit: 4
        });
    } else {
      Recipe
        .findAll({
          include: [{
            model: db.Review,
            attributes: ['content'],
            include: [{
              model: db.User,
              attributes: ['username', 'email', 'updatedAt']
            }]
          }]
        })
        .then(recipes => res.status(200).json(recipes))
        .catch(error => res.status(400).send(error));
    }
  },

  deleteARecipe(req, res) {
    return Recipe
      .findById(req.params.recipeId)
      .then((currentRecipe) => {
        const { userId } = req.body.userId;
        if (+currentRecipe.userId !== +userId) {
          return res.status(403).send({
            status: 'failed',
            error: ' sorry you can only delete your own recipe'
          });
        }

        return Recipe
          .destroy({
            where: {
              id: req.params.recipeId,
              userId: req.body.userId
            }
          })
          .then((recipe) => {
            if (recipe) {
              return res.status(200).send({
                status: 'success',
                message: 'Recipe deleted successfully'

              });
            }
            res.status(401).send({
              status: false,
              message: 'No recipe found in the database...'
            });
          })
          .catch(error => res.status(409).send({
            status: 'false',
            message: error
          }));
      });
  },

  modifyRecipe(req, res) {
    Recipe
      .findById(req.params.recipeId)
      .then((currentRecipe) => {
        const { userId } = req.body.userId;
        if (+currentRecipe.userId !== +userId) {
          return res.status(403).send({
            errorMessage: 'you can only modify your own recipe'
          });
        }
      });

    return Recipe
      .findOne({
        where: {
          id: req.params.recipeId
        }
      })
      .then(() => {
        Recipe
          .update(req.body, {
            where: {
              id: req.params.recipeId,
              userId: req.body.userId
            }
          })
          .then(() => {
            Recipe
              .findById(req.params.recipeId)
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
                    userId: newRecipe.userId
                  }
                });
              });
          })

          .catch(error => res.status(400).send({
            message: error
          }));
      });
  },

  reviewRecipe(req, res) {
    Review
      .findOne({
        where: {
          recipeId: req.params.recipeId,
          userId: req.body.userId
        },
        include: [{
          model: db.User,
          attributes: ['username', 'email', 'updatedAt']
        }]
      })
      .then(() => Review
        .create(req.reviewInput)
        .then(recipe => res.status(200).send({
          status: 'success',
          message: 'Review added successfully',
          data: { userId: recipe.userId, recipeId: recipe.recipeId }
        }))
        .catch((err) => {
          res.status(400).send({
            err,
            message: 'no recipe found'
          });
        }));
  },
  getReview(req, res) {
    return Review
      .findAll({
        where: {
          recipeId: req.params.recipeId,
        },
        include: [{
          model: db.User,
          attributes: ['username', 'email', 'updatedAt']
        }]
      })
      .then((reviews) => {
        if (reviews.length < 1) {
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

  searchFavouriteRecipe(req, res) {
    const query = req.query.search;
    return Recipe
      .findAll({
        where: {
          $or: [
            {
              recipeName: { $iLike: `%${query}%` }
            },
            {
              ingredient: { $iLike: `%${query}%` }
            }
          ]
        }
      })
      .then(() => {
        Favourite
          .findOne({})
          .then((recipe) => {
            if (recipe.length < 1) {
              return res.status(401).send({
                error: 'no favourite recipe found'
              });
            }
            return res.status(200).json({
              message: 'recipe found'
            });
          })
          .catch(error => res.status(404).send(error));
      });
  },


  favouriteRecipe(req, res) {
    if (!req.body.userId || !req.params.recipeId) {
      res.status(401).send({
        message: 'Recipe Id and User Id is required'
      });
    }
    return Favourite
      .findOne({
        where: {
          recipeId: req.params.recipeId,
          userId: req.body.userId
        }
      })
      .then(() => Favourite
        .create({
          userId: req.body.userId,
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
          userId: req.params.userId
        },
        include: [{
          model: db.Recipe,
          attributes: ['recipeName', 'ingredients', 'views', 'votes'],
          include: [{
            model: db.User,
            attributes: ['fullName', 'updatedAt']
          }]
        }],
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
        if (vote.length < 1) {
          return res.status(404).send({
            message: 'no recipe found to be upvoted'
          });
        }

        vote.increment('votes')
          .then(() => vote.reload());
        if (req.message === 'created') {
          return res.status(200).send({
            message: 'upvote successful'
          });
        } else if (req.message === 'updated') {
          return res.status(200).send({
            message: 'vote updated successfully'
          });
        } else if (req.message === 'destroyed') {
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
            message: 'no recipe found to be upvoted'
          });
        }
        vote.decrement('votes')
          .then(() => vote.reload());
        if (req.message === 'created') {
          return res.status(200).send({
            message: 'upvote successful'
          });
        } else if (req.message === 'updated') {
          return res.status(200).send({
            message: 'vote updated successfully'
          });
        } else if (req.message === 'destroyed') {
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
          id: req.params.recipeId
        },
        order: [['upvote', 'DESC']],
        include: [{
          model: db.Recipe,
          attributes: ['recipeName', 'ingredients', 'views'],
        }]
      })
      .then((display) => {
        res.status(200).json(display);
      })
      .catch(error => res.status(404).send(error));
  },


  getDownVoteRecipe(req, res) {
    return Vote
      .findAll({
        where: {
          recipId: req.params.recipeId
        },
        order: [['downvote', 'DESC']],
        include: [{
          model: db.Recipe,
          attributes: ['recipeName', 'ingredients', 'views'],
        }]
      })
      .then((display) => {
        res.status(200).json(display);
      })
      .catch(error => res.status(404).send(error));
  },

  getAllVote(req, res) {
    return Recipe
      .findAll({
        include: [{
          model: db.Vote,
          attributes: ['upvote', 'downvote'],
          order: [['votes', 'DESC']]
        }]

      })
      .then((display) => {
        res.status(200).json(display);
      })
      .catch(error => res.status(404).send(error));
  },

  viewRecipes(req, res) {
    return Recipe
      .findOne({
        where: {
          id: req.params.recipeId,
        }
      })
      .then((view) => {
        if (view.length < 1) {
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
            userId: view.userId
          }
        });
      })
      .catch(error => res.status(403).send(error));
  },
};
