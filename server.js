import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import winston from 'winston';
import Sequelize from 'sequelize';
import UserRoutes from './server/routes/user';
import validator from 'express-validator';
import RecipeRoutes from './server/routes/recipe';

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(validator());

app.use('/api/v1/users', UserRoutes);
app.use('/api/v1/recipes', RecipeRoutes);

app.get('*', (req, res) => {
    res.send("Wrong routes")
})

const port = process.env.PORT || 8000;

app.listen(port, () => {
    winston.info(`Connected on port ${port}`)
})