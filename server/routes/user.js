import express from 'express';
import UserController from '../controllers/user';
import Authorization from '../middlewares/Authorization';

const app = express.Router();

// Sign up route
app.route('/signup')
  .post(Authorization.checkUserInput,Authorization.isSignedUpWithUsername,
    Authorization.isSignedUpWithEmail, UserController.create);

// Sign in route
app.route('/signin')
  .post(Authorization.validateLogin, UserController.login);



export default app;
