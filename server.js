// DEPENDENCIES
const express= require('express');
const app = express();
const PORT= process.env.PORT || 3000;
const mongoose = require('mongoose')
const methodOverride= require('method-override')
const mongoUri =  process.env.MONGODB_URI || 'mongodb://localhost:27017/grocery_app_dev';

// MIDDLEWARE

// static files middleware
// app.use(express.static('public'))

//body parcer
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(methodOverride('_method'));



//CONTROLLERS
const thingsController = require('./controllers/things.js');
app.use('/things', thingsController);




// SEED ROUTE


// CONNECTIONS
app.listen(PORT, ()=>{

  console.log('this works');
})

mongoose.connect(mongoUri, { useNewUrlParser: true });
mongoose.connection.on('open',()=>{
  console.log('connected to mongoose!!!!!');
})
