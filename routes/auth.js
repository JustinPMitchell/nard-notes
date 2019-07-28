require('dotenv').config();
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

router.post('/login', function(req, res, next) {
  console.log('/auth/login post route', req.body);
  var hashedPass = '';
  var passwordMatch = false;

  User.findOne({ email: req.body.email }, function(err, user) {
    if(!user || !user.password){
      return res.status(403).send({
        error: true,
        message: 'Invalid User Credentials or Bad Password!'
      });
    }

    hashedPass = user.password || '';

    passwordMatch = bcrypt.compareSync(req.body.password, hashedPass);
    if (passwordMatch) {
      var token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
      });
      res.send({user: user, token: token});
    }
    else {
      res.status(401).send({
        error: true,
        message: 'Invalid Login Credentials. Try Again!'
      });
    }
  });
});


router.post('/signup', function(req, res, next) {
  console.log('/auth/signup post route', req.body);
  User.findOne({ email: req.body.email }, function(err, user) {
    if (user) {
      return res.status(400).send({error: true, message: 'Bad Request - User already exists' });
    }
    else {
      User.create({
        email: req.body.email,
        password: req.body.password
      }, function(err, user) {
        if (err){
          console.log('DB error', err);
          res.status(500).send({error: true, message: 'Database Error - ' + err.message});
        }
        else {
          var token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24 // expires in 24 hours
          });
          res.send({user: user, token: token});
        }
      });
    }
  });
});

router.post('/me/from/token', function(req, res, next) {
  var token = req.body.token || req.query.token;
  if (!token) {
    return res.status(401).send({error: true, message: 'You Must Pass a Token!'});
  }

  jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
    if (err){
      return res.status(500).send({ error: true, message: 'JWT Verification Error - ' + err});
    }
    User.findById({
      '_id': user._id
    }, function(err, user) {
      if (err){
        console.log('DB error', err);
        return res.status(500).send({error: true, message: 'Database Error - ' + err.message});
      }
      else if(!user){
        console.log('User not found error');
        return res.status(400).json({error: true, message: 'User Not Found!'});
      }
      var token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
      });
      res.json({
        user: user,
        token: token
      });
    });
  });
});

module.exports = router;