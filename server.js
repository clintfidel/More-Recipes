import express from 'express';
// import logger from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import webpack from 'webpack';
import winston from 'winston';
import webpackMiddleware from 'webpack-dev-middleware';
// import Sequelize from 'sequelize';
import validator from 'express-validator';
import webpackConfig from './webpack.config';
import RecipeRoutes from './server/routes/recipe';
import UserRoutes from './server/routes/user';

const app = express();
dotenv.load();
app.use(webpackMiddleware(webpack(webpackConfig)));
// app.use(logger('dev'));

app.use(bodyParser.json());
app.use(express.static('./client/public/')); // configure static files folder
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());

app.use('/api/v1/users', UserRoutes);
app.use('/api/v1/recipes', RecipeRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/index.html'));
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  winston.info(`Connected on port ${port}`);
});
