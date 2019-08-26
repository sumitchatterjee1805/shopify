const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const env = require('dotenv').config();

const app = express();


const userRoutes = require('./routes/user');
const orderRoutes = require('./routes/order');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/order', orderRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
    res.send('Not found');
})

mongoose
    .connect(
        process.env.MONGO_DB_URL,
        {
            useNewUrlParser: true
        }
    )
    .then(result => {
        app.listen(process.env.PORT || 3000, err => {
            if (!err)
                console.log('Server started');
            else
                console.log(err);
        });
    })
    .catch(err => {
        console.log(err);
    });
