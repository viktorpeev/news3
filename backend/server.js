const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
var session = require('express-session');
let User = require('../backend/models/user.model');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


app.use(cors({
  origin:['http://localhost:3000'],
  methods:['GET','POST','DELETE'],
  credentials: true // enable set cookie
}));
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,
    );
    const connection = mongoose.connection;
    connection.once('open', () =>{
        console.log("MongoDB database connection established successfully");
    })

const newsRouter = require('./routes/news');
const usersRouter = require('./routes/users');

app.use('/news', newsRouter);
app.use('/users', usersRouter);
app.use(session({
    secret: 'keyboard cat',
    cookie: { maxAge: 600000 },
    resave: false,
    saveUninitialized: false,
    withCredentials: true,
  }));
app.post("/users/check",(req,res) =>{
    const username = req.body.username;
    const formpass = req.body.password;
    
     User.find({username})
         .then(user =>{
            const datapass = user[0].password;
            if(datapass == formpass)
            {
                req.session.user = username;
                res.json("true");
            }
            else{
              return res.redirect("/");
            }
          });
});
app.get('/discussion', function(req, res) {
  var sess = req.session;
  if (typeof sess.user === 'undefined') {
     res.json(''+sess.user);
  } else {
    res.json('' + sess.user);
  }
});
app.get('/isadmin', function(req, res) {
  var sess = req.session;
  if(typeof sess.user === 'undefined'){
    res.json("nemauser");
  }
  else{
    const username = sess.user;
    if(username === 'undefined'){
      res.json("nemauser");
    }
    else{
      User.find({username})
      .then(user =>{
         const isadmin = user[0].isadmin;
         if(isadmin == "1")
         {
             res.json("true");
         }
         else{
           res.json("false");
         }
       })
       .catch(err => res.status(400).json('Error: ' + err));
    }
  }
});
app.post("/logout",(req,res) =>{
  var sess = req.session;
  sess.user='undefined';
  res.json(sess.user);
});

app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
});