import winston from 'winston';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import db from '../models/index';

dotenv.config();
const {
  Review, Recipe, User, Vote
} = db;


const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: false,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});
export const reviewRecipeNotication = (req) => {
  Recipe
    .findOne({
      where: {
        id: req.params.recipeId,
      }
    })
    .then(recipe => User
      .findOne({
        where: {
          id: recipe.userId
        }
      })
      .then((user) => {
        const mailOptions = {
          from: '"More-Recipes" <clintfidel@gmail.com>',
          to: user.email,
          subject: 'Recipe Review',
          text: `Your recipe has been successfully reviewed by ${user.username} `
        };

        transporter.sendMail(mailOptions, (err, response) => {
          if (err) {
            winston.info(err);
          }
          winston.info('Email sent to: %s', response);
        });
        console.log(recipe, user, recipe.userId, '====>');
      }));
};
export const checkUserInput = (req, res, next) => {
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
    // userId: {
    //   notEmpty: true,
    //   errorMessage: 'User Id is required'
    // }
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
    userId: req.decoded.currentUser.userId
  };
  next();
};

export const verifyUserId = (req, res, next) => {
  Recipe
    .findOne({
      where: {
        userId: req.decoded.currentUser.userId
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
};

export const verifyUserIdExist = (req, res, next) => {
  User
    .findOne({
      where: {
        id: req.decoded.currentUser.userId
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
};

export const verifyRecipeId = (req, res, next) => {
  Review
    .findOne({
      where: {
        $and: {
          recipeId: req.params.recipeId,
          userId: req.decoded.currentUser.userId
        }
      }
    })
    .then((recipe) => {
      if (recipe) {
        return res.status(403).send({
          message: 'you cannot perform this operation'
        });
      }

      next();
    })
    .catch(error => res.status(403).send(error.errors));
};

// export const recipeNameExist = (req, res, next) => {
//   Recipe
//     .findOne({
//       where: {
//         recipeName: req.body.recipeName
//       }
//     })
//     .then((name) => {
//       if (name) {
//         return res.status(400).json({
//           error: 'recipe name already exist in database'
//         });
//       }
//       next();
//     })
//     .catch(() => res.status(401).send({
//       error: 'pls supply the name of the recipe'
//     }));
// };


export const verifyRecipe = (req, res, next) => {
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
};

export const checkReviewsInput = (req, res, next) => {
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
  req.reviewInput = {
    userId: req.decoded.currentUser.userId,
    content: req.body.content,
    recipeId: req.params.recipeId
  };
  next();
};

export const downVote = (req, res, next) => {
  Vote
    .findOne({
      where: {
        $and: [
          { recipeId: req.params.recipeId },
          { userId: req.decoded.currentUser.userId, }
        ]
      }
    })
    .then((found) => {
      if (found !== null && found.downvote) {
        return Vote.destroy({
          where: {
            $and: [
              { recipeId: req.params.recipeId },
              { userId: req.decoded.currentUser.userId, }
            ]
          }
        }).then(() => {
          req.message = 'destroyed';
          next();
        });
      } else if (found !== null && !found.downvote) {
        return found.update({
          upvote: 0,
          downvote: 1
        }).then(() => {
          req.message = 'updated';
          next();
        });
      } else if (found === null) {
        return Vote.create({
          recipeId: req.params.recipeId,
          userId: req.decoded.currentUser.userId,
          upvote: 0,
          downvote: 1
        }).then(() => {
          req.message = 'created';
          next();
        });
      }
    });
};

export const upVote = (req, res, next) => {
  Vote
    .findOne({
      where: {
        $and: [
          { recipeId: req.params.recipeId },
          { userId: req.decoded.currentUser.userId, }
        ]
      }
    })
    .then((found) => {
      if (found !== null && found.upvote) {
        return Vote.destroy({
          where: {
            $and: [
              { recipeId: req.params.recipeId },
              { userId: req.decoded.currentUser.userId, }
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
          userId: req.decoded.currentUser.userId,
          upvote: 1,
          downvote: 0
        }).then(() => {
          req.message = 'created';
          next();
        });
      }
    });
};
