var express = require('express'),
    mongoose = require('mongoose'),
    router = express.Router(),
    User = require('../models/user.js');


    var restrictAccess = function (req, res, next) {
      var sessionId = req.session.currentUser;
      var reqId = req.params.id;
      sessionId = reqId ? next() : res.status(400).send({err: 400, msg: "You shall not pass"});
    };

    var authenticate = function (req, res, next) {
      req.session.currentUser ? next() : res.status(403).send({err: 403, msg: "log in troll"});
    };



router.get('/users', function (req,res) {
  User.find().populate('posts').exec(function (err, users) {
    res.send(users);
  });
});

router.get('/users/:id', authenticate, restrictAccess, function (req, res) {
  User.findById(req.params.id).exec(function (err, user) {
    res.send(user);
  });
});

router.post('/users', function (req, res) {
  var user = new User (req.body);
  user.save (function (err) {
    if(err) {
      console.log(err);
    }else {
      res.send(user);
    }
  });
});

router.put('/users', function(req, res) {
  User.findById(req.session.currentUser).populate('posts').exec(function(err, user) {
    user.addPosts(req, res);
  });
});

module.exports = router;
