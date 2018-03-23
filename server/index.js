const express = require('express');
const app = express();
const path = require('path');

app.use('/public', express.static('public'));

app.get('/', (req,res,next)=>{
  res.sendFile(path.join(__dirname,'../public/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`connected to ${port}`));

const db = require('./db');
const { User } = db.models;

app.get('/api/users', (req,res,next)=>{
  User.findAll()
    .then(users => res.send(users))
});


db.syncAndSeed();