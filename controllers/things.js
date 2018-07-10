
// Dependencies
const express = require('express')
const router = express.Router();

// Models
const Thing = require('../models/things.js')

// seed data
router.get('/seed', (req, res) => {
  Thing.create(
    [
      {
        weather: 'Sunny',
        name: 'Ride A Bike',
        description: 'Feel the wind in your hair',
        img: 'https://image.freepik.com/free-vector/kid-riding-a-bike_23-2147513580.jpg',
        likes: 3
      }, {
        weather: 'Rainy',
        name: 'Play a Board Game',
        description: 'Fun for the whole family',
        img: 'http://iloveboardgames.com/wp-content/uploads/2013/05/familyplayingcartoon.jpg',
        likes: 5
      }, {
        weather: 'Windy',
        name: 'Fly a Kite',
        description: 'capture the power of the wind',
        img: 'https://cdn5.vectorstock.com/i/1000x1000/20/44/cartoon-boy-playing-kite-vector-1542044.jpg',
        likes: 3
      }
    ],
    (err, data)=>{
          res.redirect('/things');
      }
  )
})





//delete route
router.delete('/:id', (req, res)=>{
  Thing.findByIdAndRemove(req.params.id, (error, data)=>{
    res.redirect('/things');
  })
})

//edit route
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


//new route
router.get('/new', (req, res)=>{
  res.render('new.ejs');
});
router.get('/', (req, res)=>{
    Thing.find({}, (error, allThings)=>{
        res.render('index.ejs', {
            things: allThings
        });
    });
});
router.get('/:id', (req, res)=>{
    Thing.findById(req.params.id, (err, foundThing)=>{
        res.render('show.ejs', {
          thing: foundThing
        });
    });
});


//create route
router.post('/', (req, res)=>{
        Thing.create(req.body, (error, createThing)=>{
      res.redirect('things')
    })
});







module.exports = router;