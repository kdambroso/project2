
// Dependencies
const express = require('express')
const router = express.Router();


// Models
const Thing = require('../models/things.js')
const User = require('../models/users.js');

// seed data
router.get('/seed', (req, res) => {
  Thing.create(
    [
      {
        weather: 'Sunny',
        name: 'Ride A Bike',
        description: 'Feel the wind in your hair',
        img: 'https://image.freepik.com/free-vector/kid-riding-a-bike_23-2147513580.jpg',
        likes: 3,
        createdBy: 'Admin'
      }, {
        weather: 'Rainy',
        name: 'Play a Board Game',
        description: 'Fun for the whole family',
        img: 'http://iloveboardgames.com/wp-content/uploads/2013/05/familyplayingcartoon.jpg',
        likes: 5,
        createdBy: 'Admin'
      }, {
        weather: 'Windy',
        name: 'Fly a Kite',
        description: 'capture the power of the wind',
        img: 'https://cdn5.vectorstock.com/i/1000x1000/20/44/cartoon-boy-playing-kite-vector-1542044.jpg',
        likes: 3,
        createdBy: 'Admin'
      }
    ],
    (err, data)=>{
          res.redirect('/things');
      }
  )
})

// Get Index
router.get('/things', (req, res) => {
  User.find({}, (err, foundUsers) => {
    if(req.session.currentUser){
    res.render('index.ejs', {
      users: foundUsers
        });
    } else {
        res.redirect('/things');
    }

  });
});

//Delete Route
router.delete('/:id', (req, res)=>{
  Thing.findByIdAndRemove(req.params.id, (error, data)=>{
    res.redirect('/things');
  })
})




//Edit Route
router.get('/:id/edit',(req, res)=>{
  Thing.findById(req.params.id, (err, foundThing)=>{
      res.render('edit.ejs',
      {
        thing:foundThing
      })
  })
})
router.put('/:id',(req, res)=>{
  Thing.findByIdAndUpdate(req.params.id, req.body,{new:true},(err, update)=>{
    res.redirect('/things')
  })
})

//Buy Route
router.get('/:id/likes', (req, res)=>{
  Thing.findById(req.params.id,(err, foundThing)=>{
    res.send(foundThing)
  })
})
router.put('/:id/likes', (req, res)=>{
  Thing.findByIdAndUpdate(req.params.id,{$inc: {likes:+1}}, {new:true}, (err, foundThing)=>{
    res.redirect('/things/'+ req.params.id)
  })
})


//New oute
router.get('/new', (req, res)=>{
  res.render('new.ejs');
});
router.get('/', (req, res)=>{
    Thing.find({}, (error, allThings)=>{
        res.render('index.ejs', {
            things: allThings,
            currentUser:req.session.currentUser
        });
    });
});
router.get('/:id', (req, res)=>{
    Thing.findById(req.params.id, (err, foundThing)=>{
        res.render('show.ejs', {
          thing: foundThing,
          currentUser:req.session.currentUser
        });
    });
});


//create route
router.post('/', (req, res)=>{
    req.body.createdBy= req.session.currentUser.username
      Thing.create(req.body, (error, createThing)=>{
      res.redirect('things')
    })
});







module.exports = router;
