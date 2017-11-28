import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../models';
import { sendMailSignUp } from '../middlewares/Authorization';

// dotenv.load();
dotenv.config();
const secret = process.env.secretKey;

const { User } = db;

/** Adds a new user to the database
   * @param  {object} req request object
   * @param  {object} res response object
   * Route: POST: api/users/signup
   */

export const signUp = (req, res) => {
  const { username } = req.body;
  return User.findOne({ where: { username } })
    .then((user) => {
      if (!user) {
        User
          .create(req.userInput)
          .then((activeUser) => {
            activeUser
              .update({
                active: true
              });
            const currentUser = {
              userId: activeUser.id,
              username: activeUser.username,
              fullName: activeUser.fullName,
              email: activeUser.email,
              active: activeUser.active,
              isAdmin: activeUser.isAdmin
            };
            console.log(currentUser);
            sendMailSignUp(activeUser.email);
            const token = jwt.sign({ currentUser }, secret);
            return res.status(200).send({
              message: 'Signed up successfully',
              Token: token
            });
          })
          .catch(error => res.status(500).send({
            status: false,
            message: (error.errors !== null) ? error.errors[0].message : error.message
          }));
      } else {
        res.status(409).json({ message: 'User already exist' });
      }
    });
};


/** Authenticates user login information
   * @param  {object} req
   * @param  {object} res
   * Route: POST: /users/signin
   */

export const login = (req, res) => {
  User
    .findOne({
      where: { username: req.body.username }
    })
    .then((user) => {
      user
        .update({
          active: true,

        }).then((result) => {
          const currentUser = {
            userId: result.id,
            username: result.username,
            fullname: result.fullName,
            active: result.active,
            isAdmin: result.isAdmin,
          };
          const token = jwt.sign({ currentUser }, secret);
          res.status(200)
            .json({
              message: 'Logged In Successfully',
              Token: token
            });
        });
    });
};

export const getAllUsers = (req, res) => {
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
    .catch(() => res.status(500).json({
      status: false
    }));
};

export const editProfile = (req, res) => {
  User
    .findOne({
      where:  {id: req.decoded.currentUser.userId}
    })
    .then((edit) => {
      edit
        .update({fullname: edit.fullName,
        email: edit.email})
        .then((result) => {
          return res.status(200).json({
            message: 'profile edited successfully',
            data: {
              fullName: result.fullName,
              email: result.email
            }
          })
        })
        .catch(() => res.status(500).json({
          message: 'internal server error'
        }))
    })
}
