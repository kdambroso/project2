// DEPENDENCIES
const express = require('express');
const router = express.Router();
const User = require('../models/users.js');


// ROUTES
// get index
router.get('/', (req, res) => {

  User.find({}, (err, foundUsers) => {
    if(req.session.currentUser){
    res.render('messages/index.ejs', {
      users: foundUsers
        });
    } else {
        res.redirect('/');
    }

  });
});



router.post ('/new', (req, res) => {

  User.findOneAndUpdate(
    {_id: req.session.currentUser._id},
    { $push: { messages: req.body.message } },
    (err, foundUser) => {
      res.redirect('/messages');
  });
});

// EXPORT
module.exports = router;
