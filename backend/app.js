const express = require('express');

const app = express();
const mongoose = require('mongoose');
const Thing = require('./models/sauces');
const productRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
const path = require('path');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

 app.use(express.json());

mongoose.connect('mongodb+srv://kiarie:mongodb@piiquante.q7tpi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

  app.use('/images', express.static(path.join(__dirname, 'images')));
 app.use('/api/sauces', productRoutes);
  app.use(express.json());
app.use('/api/sauces', productRoutes);
app.use('/api/auth', userRoutes);


module.exports = app;