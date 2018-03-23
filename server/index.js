const express = require('express');
const app = express();
const path = require('path');

app.use('/public', express.static('public'));
app.use('/vendor', express.static('node_modules'));
app.use(require('body-parser').json())

app.get('/', (req,res,next)=>{
  res.sendFile(path.join(__dirname,'../public/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`connected to ${port}`));

const db = require('./db');
const { User } = db.models;

app.get('/api/users', (req,res,next)=>{
  User.findAll({
    order:[[ 'rank', 'DESC']]
  })
    .then(users => res.send(users))
});

app.post('/api/users', (req,res,next)=>{
  User.create(req.body)
    .then(user => res.send(user))
});

app.put('/api/users/:id', (req,res,next)=>{
  User.findById(req.params.id)
    .then(user => user.update(req.body))
    .then(user => res.send(user))
});

app.delete('/api/users/:id', (req,res,next)=>{
  User.findById(req.params.id)
    .then(user => user.destroy())
    .then(() => res.sendStatus(204))
});

db.syncAndSeed();