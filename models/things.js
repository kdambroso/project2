
// Dependencies

const mongoose = require('mongoose')
const Schema = mongoose.Schema


// Set up Schema

const thingSchema= new mongoose.Schema({
  weather: {type: String,
  required: true
},
  name: {
    type: String,
    required: true
  },
  description: String,
  img: String,
  likes: {
    type: Number
  }
})
// Set up Model

const Thing = mongoose.model('Things', thingSchema);

// Module Exports
module.exports= Thing;
