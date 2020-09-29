const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const Users = require('../models/Users');

router.post('/', (req, res, next) => {
  Users.find({email: req.body.email})
    .exec()
    .then(user => {
      if(user.length === 0) {
        // No user found
        return res.status(401).json({
          message: 'Authentication failed'
        })
      } else {
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if(err) {
            return res.status(401).json({
              message: 'Authentication failed'
            })
          } else if(result) {
            // If password matches, we will generate a token. Token is a type of authentication which is used for maintaining sessions.
            return res.status(200).json({
              message: 'Authentication successful'
            })
          } else {
            res.status(401).json({
              message: 'Authentication failed'
            })
          }
        })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    })
})

module.exports = router;