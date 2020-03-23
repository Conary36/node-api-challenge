const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const actionRouter = require('./data/helpers/actionRouter.js');
const projectRouter = require('./data/helpers/projectRouter.js');
const server = express();

//global middleware
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(logger);
server.use('/api/action', actionRouter);
server.use('/api/project', projectRouter);


function logger(req, res, next){
    const method = req.method;
    const endpoint = req.originalUrl;

    console.log(`${method} to ${endpoint}`);
    next();
}

module.exports = server;