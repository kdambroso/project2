
// Dependencies

const mongoose = require('mongoose')
const Schema = mongoose.Schema


// Set up Schema

const activitySchema = new Schema({
  weather: {type: String,
  required: true
},
  activity: {
    type: String,
    required: true
  },
  description: String,
  img: String,
  price: {
    type: Number,
    min: [0, 'Price can\'t be less than 0.']
  },
  rating: {
    type: Number
  }
})


// Set up Model

const Activity = mongoose.model('Activity', activitySchema)


// Module Exports

module.exports = Activity
