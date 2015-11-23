var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    User = require('../models/user.js');

    router.post('/sessions', function(req, res) {
      User.find({email: req.body.email }).exec(function (err, user) {
        user[0].comparePassword(req.body.password, function(err, isMatch) {
          if(isMatch) {
            req.session.currentUser = user[0]._id
            res.send(user);
          }else {
            res.status(400).send({err: 400, msg: 'incorrect password'});
          }
        });
      });
    });

    router.delete('/sessions', function(req, res) {
      req.session.id = null;
      res.send({msg: "Current User Logged Out"});
    });



module.exports = router;
