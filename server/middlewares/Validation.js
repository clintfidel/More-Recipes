export default {
  checkUserInput(req, res, next) {
    req.checkBody(
      {
        title: {
          notEmpty: true,
          errorMessage: 'Recipe title is required'
        },
        description: {
          notEmpty: true,
          errorMessage: 'Please add recipe description'
        },
        instructions: {
          notEmpty: true,
          errorMessage: 'Please provide a guide'
        },
        details: {
          notEmpty: true,
          errorMessage: 'Give lists of recipe ingredients'
        },
        userId: {
          notEmpty: true,
          errorMessage: 'User Id is required'
        }
      }
    );
    const errors = req.validationErrors();
    if (errors) {
      const allErrors = [];
      errors.forEach((error) => {
        allErrors.push({
          error: error.msg,
        });
      });
      return res.status(409)
        .json(
          allErrors
        );
    }
    //console.log(req.body.details.split(' '))
    req.userInput = {
      title: req.body.title,
      instructions: req.body.instructions,
      details: req.body.details,
      description: req.body.description,
      userId: req.body.userId
    };
    next();
  },
  checkReviewsInput(req, res, next) {
    req.checkBody(
      {
        userId: {
          notEmpty: true,
          errorMessage: 'UserId is required'
        },
        content: {
          notEmpty: true,
          errorMessage: 'Please add reviews'
        },
        recipeId: {
          notEmpty: true,
          errorMessage: 'Please provide recipe id'
        },
      }
    );
    const errors = req.validationErrors();
    if (errors) {
      const allErrors = [];
      errors.forEach((error) => {
        allErrors.push({
          error: error.msg,
        });
      });
      return res.status(409)
        .json(
          allErrors
        );
    }
    req.reviewInput = {
      userId: req.body.userId,
      content: req.body.content,
      recipeId: req.params.recipeId,
    };
    next();
  }
};
