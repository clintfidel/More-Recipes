import express from 'express';
import UserController from '../controllers/user';
import Authorization from '../middlewares/Authorization';

const app = express.Router();

// Sign up route
app.route('/signup')
  .post(Authorization.checkUserInput,
    UserController.signUp);

// Sign in route
app.route('/signin')
  .post(Authorization.validateLogin, UserController.login);

// get all user Route
app.route('/')
  .get(Authorization.isLoggedIn, Authorization.isAdmin, UserController.getAllUsers);


export default app;
