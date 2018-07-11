const express =require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcryptjs= require('bcryptjs');

router.get('/new', (req, res)=>{
  res.render('sessions/new.ejs')
})

router.delete('/things/sessions', (req, res)=>{
  console.log('hello');
  req.session.destroy(()=>{
    res.redirect('/things')
  })
})

router.post('/', (req,res)=>{
  User.findOne({username: req.body.username}, (err, foundUser)=>{
    console.log(foundUser);
    if(bcryptjs.compareSync(req.body.password, foundUser.password)){
      req.session.currentUser = foundUser;
      res.redirect('/');
    }else{
      res.send('wrong password')
    }
  })
})


module.exports = router;
