const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//import controllers
const usersRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');

const app = express();

app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/api/users', usersRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/cart', cartRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

console.log('Open Database Connection.')
//const url = 'mongodb://online-shop-db/shop';
const url = 'mongodb://localhost:27017/shop'
const options = { 
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose.connect(url, options)
.then(
    result => {
        console.log('Database is connected!')
        app.listen(8080);
})
.catch(
    error => {
        console.log('Database connection error!');
        console.log(error);
});