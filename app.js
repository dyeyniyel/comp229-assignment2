/*
File name: app.js
Student Name: Janiel Mark Javier
Student ID: 301379377
Date: 06/17/2024
*/

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('./config/config.js')
var productRoutes = require('./routes/product.routes');  //importing module for products


const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(config.mongoUri);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}



var app = express();

//Main view text
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Marketplace application.' });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//Use product routes
app.use('/', productRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
