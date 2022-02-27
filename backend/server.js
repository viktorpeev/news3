const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
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

app.post("/login",(req,res)=>{
    const {email,password} =req.body;
    User.findone({email:email},(err,user)=>{
        if(user){
           if(password === user.password){
               res.send({message:"login sucess",user:user})
           }else{
               res.send({message:"wrong credentials"})
           }
        }else{
            res.send("not register")
        }
    })
});

app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
});