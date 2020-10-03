const express = require('express');
const config = require('./config');
const hpp = require('hpp');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const indexRouter = require('./routes');

app.use(hpp());
app.use(helmet());

app.use(cors({ origin: true, credential: true }));

if(process.env.NODE_ENV != "test"){
    app.use(morgan('dev'));
}

app.use(express.json()); //http body parser
app.use(express.urlencoded({ extended: false } ));

app.use('/', indexRouter);

module.exports = app;