import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import winston from 'winston';
import db from '../models/';


dotenv.config();
const key = process.env.secretKey;
const { User } = db;

export const sendMailSignUp = (email) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: false,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  const mailOptions = {
    from: '"More-Recipes" <clintfidel@gmail.com>',
    to: email,
    subject: 'Account created',
    text: 'Your account has been successful created',
  };

  return transporter.sendMail(mailOptions, (err, response) => {
    if (err) {
      winston.info(err);
    }
    winston.info('Email sent to: %s', response);
  });
};

export const checkUserInput = (req, res, next) => {
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
    isAdmin: req.body.isAdmin,
    password,
  };
  next();
};
/** Validates users login information
   * @param  {Object} req - request
   * @param  {Object} res - response
   * @param  {Object} next - calls the next method
   */

export const validateLogin = (req, res, next) => {
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
};

// export const isSignedUpWithUsername = (req, res, next) => {
//   User
//     .findOne({
//       where: {
//         username: req.body.username
//       }
//     })
//     .then((user) => {
//       if (!user) {
//         return res.status(200).json({
//         });
//       }

//       next();
//     })
//     .catch(() => res.status(500).send('Internal sever error));
// };

// export const isSignedUpWithEmail = (req, res, next) => {
//   User
//     .findOne({
//       where: {
//         email: req.body.email
//       }
//     })
//     .then((user) => {
//       if (user) {
//         return res.status(400).json({
//           error: 'email already exist in database'
//         });
//       }
//       next();
//     })
//     .catch(() => res.status(500).send('Internal sever error));
// };

export const isLoggedIn = (req, res, next) => {
  let token;
  const tokenAvailable = req.headers.authorization ||
  req.headers['x-access-token'];
  if (req.headers.authorization) {
    token = req.headers.authorization.split(' ')[1];
  } else {
    token = tokenAvailable;
  }
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
};

export const isAdmin = (req, res, next) => {
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
};

