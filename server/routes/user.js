import express from 'express';
import { signUp, login, getAllUsers, editProfile } from '../controllers/user';
import { checkUserInput, validateLogin,
  isLoggedIn, isAdmin } from '../middlewares/Authorization';

const app = express.Router();

// Sign up route
app.route('/signup')
  .post(
    checkUserInput,
    signUp
  );
// Sign in route
app.route('/signin')
  .post(validateLogin, login);

// get all user Route
app.route('/')
  .get(isLoggedIn, isAdmin, getAllUsers);

// edit profile
app.route('/editProfile')
  .put(isLoggedIn, editProfile);

export default app;
