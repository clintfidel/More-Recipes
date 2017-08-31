import express from 'express';
import UserController from '../server/controllers/User';

const app = express.Router();

// sign up route

app.route('/signup')
  .post(UserController.create);

// sign in route

app.route('/api/users/signin')
  .post(UserController.login);
