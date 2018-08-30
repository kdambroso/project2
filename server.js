// DEPENDENCIES
const express= require('express');
const app = express();
const PORT= process.env.PORT || 3000;
const mongoose = require('mongoose')
const methodOverride= require('method-override')
const session = require('express-session');
const bcryptjs = require('bcryptjs');
const mongoUri =  process.env.MONGODB_URI || 'mongodb://localhost:27017/grocery_app_dev';

// MIDDLEWARE
// static files middleware
app.use(express.static('public'))
//body parcer
app.use(express.urlencoded({extended:true}));
app.use(express.json());
//delete
app.use(methodOverride('_method'));
//login
app.use(session({
  secret: 'feedmeseymour',
  resave: false,
  saveUninitialized: false
}))


//CONTROLLERS
const thingsController = require('./controllers/things.js');
app.use('/things', thingsController);
//users
const userController = require('./controllers/users.js')
app.use('/users', userController);
//sessions
const sessionsController = require('./controllers/sessions.js')
app.use('/things/sessions', sessionsController);


// Reroute to `things`
app.get('/', (req, res) => {
  res.redirect('/things')
})

// GET INDEX
app.get('/things', (req, res) => {
  res.render('index.ejs', {currentUser: req.session.currentUser});
});

// CONNECTIONS
app.listen(PORT, ()=>{

  console.log('this works');
})


mongoose.connect(mongoUri, { useNewUrlParser: true });
mongoose.connection.on('open',()=>{
  console.log('connected to mongoose!!!!!');
})
