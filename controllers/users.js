const express= require('express');
const router = express.Router();
const User= require('../models/users.js');
const bcryptjs = require('bcryptjs')


router.get('/new', (req, res)=>{
  res.render('users/new.ejs');

})


router.post('/', (req, res)=>{
    req.body.password = bcryptjs.hashSync(req.body.password, bcryptjs.genSaltSync(10));
    User.create(req.body, (err, createdUser)=>{
        res.redirect('/');
    });
});

module.exports= router;
