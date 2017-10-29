import express from 'express';
import { signUp, login, getAllUsers } from '../controllers/user';
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


export default app;
