import db from '../models/index';

const { Recipes, Reviews, Favourites, Votes } = db;

export default {
    addRecipe(req, res) {
      return Recipes
        .create(req.userInput)
        .then(() => {
          res.send({
              status: 'Success',
              message: "Recipe inserted succesfully"
          })
        })
        .catch(error => res.status(400).send({
          status: false,
          message: error
        }));
    },
  getRecipe(req, res) {
    return Recipes
    .findAll({})
    .then((recipes) => {
      if(recipes.length < 1) {
        res.status(200).send({
          message: 'There is no recipe in the database'
        })
      } else {
        res.status(200).json(recipes)
      }
    })
    .catch((error) => res.status(400).send(error))
  },

  deleteARecipe(req, res){
    return Recipes
    .destroy({
      where: {
        id: req.params.recipeId,
        userId: req.body.userId
      }
    })
    .then((recipe) => {
      if(recipe){
        res.status(200).send({
      status: 'success',
      message: 'Recipe deleted successfully'
    })
      } else {
        res.status(401).send({
          status: false,
          message: 'You are not authorized to perform that action'
        })
      }
    })
    .catch((error) => res.status(409).send({
      status: 'success',
      message: error
    }))
  },

  modifyRecipe(req, res){
    return Recipes
    .update(req.body, {
      where: {
        id: req.params.recipeId
      }
    })
    .then(() => res.status(200).send({
      message: 'Recipe modified successfully'
    }))
    .catch((error) => res.status(400).send({
      message: error
    }))
  },

  reviewRecipe(req, res) {
    return Reviews
    .create(req.reviewInput)
    .then(() => res.status(200).send({
      message: 'Review added successfully'
    }))
    .catch((error) => res.status(400).send({
      message: error
    }))
  },

  favouriteRecipe(req, res) {
    if(!req.body.userId || !req.params.recipeId){
      res.status(401).send({
        message: 'Recipe Id and User Id is required'
      })
    }
    return Favourites
    .create({
      userId: req.body.userId,
      recipeId: req.params.recipeId
    })
    .then(() => res.status(200).send({
      message: 'Favourite added successfully'
    }))
    .catch((error) => res.status(400).send({
      message: error
    }))
  },

  getFavourites(req, res){
    return Favourites
    .findAll({})
    .then((favourites) => {
      if(favourites.length < 1){
        return res.status(200).send({
          message: 'The user has no favourite recipe'
        });
      }
        return res.status(200).send(favourites)
    })
    .catch((error) => {
      res.send(error);
    })
  },

  upVoteRecipe(req, res){
    return Votes
    .findOne({
      where: {
        recipeId: req.params.recipeId
      }
    })
    .then((vote) => {
      if(vote){
        Votes.update({
          rate: vote.rate + 1
        })
        .then(() => res.status(201).send({
          message: 'Recipe upvoted successfully'
        }))
        .catch((error) => res.status(409).send(error))
      } else {
        Votes.create({
          recipeId: req.params.recipeId,
          userId: req.body.userId
        })
        .then(() => res.status(201).send({
          message: 'Recipe upvoted successfully'
        }))
        .catch((error) => res.status(409).send({
          message: error
        }))
      }
    })
  },
  searchFavouriteRecipe (req, res) {
    return Favourites
    .findAll({
      where: {
        $or: [
          { recipeName: {
            $iLike: `%${req.query.search}%` }
          },
          { ingredient: {
            $iLike: `%${req.query.search}%` }
          }
        ]
      }
    })

  },

  getUpvoteRecipe (req, res){
    return Recipes
    .findAll({
      order:[['votes', 'DESC']]
    })
    .then((display) => {
      res.status(200).json(display)
    })
  }

}
