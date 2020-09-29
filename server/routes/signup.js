const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Users = require('../models/Users');

// For creating a new user we will require the user's
// password. We can store the users password in normal
// form but thats not secure. So we should encode it or
// hash it by using libraries like bcrypt. We will use 
// it to store passwords in hash form in our database.
// These type of libraries use one way encryption algorithm
// so anyone cannot regenerate the password from the hash form.
const bcrypt = require('bcrypt');

router.post('/', (req, res, next) => {
  console.log(req.body);
  Users.find({email: req.body.email})
    .exec()
    .then(user => {
      if(user.length === 1) {
        // email already exists
        return res.status(409).json({
          message: 'user already exists'
        })
      } else {
        // create a new user
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if(err) {
            console.log(err);
            return res.status(500).json({
              error: err
            })
          } else {
            const user = new Users({
              _id: new mongoose.Types.ObjectId,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              password: hash
            });
            user
              .save()
              .then(result => {
                res.status(201).json({
                  message: 'user created'
                })
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                })
              })
          }
        })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(422).json({
        error: err
      })
    })
})

module.exports = router;