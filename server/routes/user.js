import express from 'express';
import UserController from '../controllers/user';
import { checkUserInput, signUpNotification, validateLogin, isSignedUpWithUsername,
  isSignedUpWithEmail, isLoggedIn, isAdmin } from '../middlewares/Authorization';

const app = express.Router();

// Sign up route
app.route('/signup')
  .post(
    checkUserInput, isSignedUpWithEmail, isSignedUpWithUsername,
    signUpNotification,
    UserController.signUp
  );
// Sign in route
app.route('/signin')
  .post(validateLogin, UserController.login);

// get all user Route
app.route('/')
  .get(isLoggedIn, isAdmin, UserController.getAllUsers);


export default app;
