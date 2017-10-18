import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../models';

dotenv.load();
const secret = process.env.secretKey;

const { User } = db;
export default {
  /** Adds a new user to the database
   * @param  {object} req request object
   * @param  {object} res response object
   * Route: POST: api/users/signup
   */

  signUp(req, res) {
    return User
      .create(req.userInput)
      .then((user) => {
        console.log(user)
        user
          .update({
            active: true
          });
        const currentUser = {
          userId: user.id,
          username: user.username,
          fullname: user.fullName,
          email: user.email,
          active: user.active
        };
        const token = jwt.sign({ currentUser }, secret);
        return res.status(201).send({
          message: 'Signed up successfully',
          Token: token
        });
      })
      .catch(error => res.status(400).send({
        status: false,
        message: error.errors[0].message
      }));
  },


  /** Authenticates user login information
   * @param  {object} req
   * @param  {object} res
   * Route: POST: /users/signin
   */

  login(req, res) {
    User
      .findOne({
        where: { username: req.body.username }
      })
      .then((user) => {
        user
          .update(
            {
              active: true,

            }).then((result) => {
            const currentUser = { userId: result.id,
              username: result.username,
              fullname: result.fullName,
              active: result.active,
              isAdmin: result.isAdmin,
              plan: result.plan };
            const token = jwt.sign(
              { currentUser
              }, secret
            );
            res.status(200)
              .json({
                message: 'Logged In Successfully',
                Token: token
              });
          });
      });
  },

  getAllUsers(req, res) {
    User
      .findAll({})
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: 'no user found in the database'
          });
        }

        return res.status(200).json(user);
      })
      .catch(() => res.status(403).json({
        status: false
      }));
  }
};
