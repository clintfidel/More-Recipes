import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import winston from 'winston';
import db from '../models/';

dotenv.load();
const key = process.env.secretKey;
const { User } = db;


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

export default {

  signUpNotification(req, res, next) {
    User
      .findOne({
        where: {
          username: req.body.username,
          email: req.body.email
        }
      })
      .then((user) => {
        if (user) {
          const mailOptions = {
            from: '"More-Recipes" <clintfidel@gmail.com@gmail.com>',
            to: user.email,
            subject: 'Account created',
            text: 'Your account has been successful created, click on the link below to check',
          };

          transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
              winston.info(err);
            }
            winston.info('Email sent to: %s', response);
            next();
          });
        }
      })
      .catch(error => res.status(400).send(error));
  },

  checkUserInput(req, res, next) {
    const userNameError = 'Please provide a username with atleast 5 characters.';
    req.checkBody({
      username: {
        notEmpty: true,
        isLength: {
          options: [{ min: 5 }],
          errorMessage: userNameError
        },
        errorMessage: 'Your Username is required'
      },
      email: {
        notEmpty: true,
        isEmail: {
          errorMessage: 'Provide a valid a Email Adrress'
        },
        errorMessage: 'Your Email Address is required'
      },
      fullName: {
        notEmpty: true,
        errorMessage: 'Your Fullname is required'
      },
      password: {
        notEmpty: true,
        isLength: {
          options: [{ min: 8 }],
          errorMessage: 'Provide a valid password with minimum of 8 characters'
        },
        errorMessage: 'Your Password is required'
      }
    });
    const errors = req.validationErrors();
    if (errors) {
      const allErrors = [];
      errors.forEach((error) => {
        allErrors.push({
          error: error.msg,
        });
      });
      return res.status(409)
        .json(allErrors);
    }
    const password = bcrypt.hashSync(req.body.password, 10); // encrypt password
    req.userInput = {
      username: req.body.username,
      fullName: req.body.fullName,
      email: req.body.email,
      password,
    };
    next();
  },
  /** Validates users login information
   * @param  {Object} req - request
   * @param  {Object} res - response
   * @param  {Object} next - calls the next method
   */

  validateLogin(req, res, next) {
    if (!req.body.username || !req.body.password) {
      return res.status(400)
        .json({
          message: 'Please provide your username or password to login'
        });
    }
    User.findOne({
      where: {
        username: req.body.username
      }
    })
      .then((user) => {
        if (user &&
          bcrypt.compareSync(req.body.password, user.password)) {
          next();
        } else {
          return res.status(401)
            .json({
              ' message': 'Invalid Credentials.'
            });
        }
      })
      .catch(error => res.status(401).send({
        error,
        message: 'invalid details passed'
      }));
  },

  isSignedUpWithUsername(req, res, next) {
    User
      .findOne({
        where: {
          username: req.body.username
        }
      })
      .then((user) => {
        if (user) {
          return res.status(400).json({
            error: 'username already exist in database'
          });
        }

        next();
      })
      .catch(error => res.status(401).send({
        error,
        message: 'invalid details passed'
      }));
  },

  isSignedUpWithEmail(req, res, next) {
    User
      .findOne({
        where: {
          email: req.body.email
        }
      })
      .then((user) => {
        if (user) {
          return res.status(400).json({
            error: 'email already exist in database'
          });
        }

        next();
      })
      .catch(error => res.status(401).send({
        error,
        message: 'invalid details passed'
      }));
  },

  isLoggedIn(req, res, next) {
    const token = req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, key, (error, decoded) => {
        if (error) {
          res.status(401)
            .send({
              message: 'Failed to Authenticate Token',
              error
            });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(401)
        .json({
          message: 'Access denied, Authentication token does not exist'
        });
    }
  },

  isAdmin(req, res, next) {
    const decodeToken = req.decoded;
    if (typeof decodeToken.currentUser.isAdmin === 'undefined') {
      return res.status(403).send({
        message: 'you do not have permkission to perform this operation'
      });
    } else if (decodeToken.currentUser.isAdmin === true) {
      next();
    } else {
      res.status(403).send({
        status: false,
        message: 'you are not authorized to perform this operation '
      });
    }
  }
};

