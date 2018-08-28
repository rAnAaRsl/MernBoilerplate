const express = require('express');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');
const passport = require('passport');

const  users = require('./routes/api/users');
const  profile = require('./routes/api/profile');
const  posts = require('./routes/api/post');



const app = express();

// Body Parser Middleware

app.use(bodyParse.urlencoded({extended:false}));
app.use(bodyParse.json());

// DB config
const db = require('./config/key').mongoURI;


mongoose.connect(db).then(()=>console.log('MongoDb connected')).catch(err=>console.log(err));

// Passport Middleware

app.use(passport.initialize());

// Passport Config

require('./config/passport')(passport);

// Use Routes

app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`sever running on port ${port}`));
