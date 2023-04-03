const express = require('express');
const mongoose = require ('mongoose');
const app = express ();
const Cars = require('./models/cars.js');
const cors = require('cors');
app.use(cors());
const db = mongoose.connection;
require('dotenv').config()
const PORT = process.env.PORT

const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI)
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/' , (req, res) => {
    res.send('Hello World!');
  });

app.post('/cars', (req, res) => {
    Cars.create(req.body)
        .then((createdCar) => {
            res.json(createdCar)
    })
})

app.get('/cars', (req, res) => {
    Cars.find({})
        .then((foundCar) => {
            res.json(foundCar)
        })
})

app.delete('/cars/:id', (req, res) => {
    Cars.findByIdAndRemove(req.params.id)
        .then((deletedCar) => {
            res.json(deletedCar)
        })
})

app.put('/cars/:id', (req, res) => {
    Cars.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then((updatedCar) => res.json(updatedCar))
})

app.listen(PORT, () => console.log( 'Listening on port:', PORT));
mongoose.connection.once('open', () => {
    console.log('connected to mongod...');
});