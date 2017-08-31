import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import winston from 'winston';
import Sequelize from 'sequelize';

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.send("Hello World")
})

const port = process.env.PORT || 8000;

app.listen(port, () => {
    winston.info(`Connected on port ${port}`)
})