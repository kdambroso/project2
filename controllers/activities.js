
// Dependencies
const express = require('express')
const router = express.Router();

// Models
const Activity = require('../models/activities.js')

// Index
router.get('/', (req, res) => {
  Activity.find({}).sort({weather: 1}).exec((err, allActivities) => {
    if (err) {
      res.send(err)
    } else {
      res.render('index.ejs', {
        activities: allActivities
      })
    }
  })
})

//new route
router.get('/activity/new', (req, res)=>{
  res.render('new.ejs');
});



//create route

module.exports = router;
