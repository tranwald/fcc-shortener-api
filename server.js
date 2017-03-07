const mongo = require('mongodb').MongoClient;
const express = require('express');

const MONGO_PORT = 28017;
const APP_PORT = process.env.PORT || 8080;
const DB_NAME = 'urls-database';
const URL = `mongodb://localhost:${MONGO_PORT}/${DB_NAME}`;

const validateUrl = (url) => false;

const app = express();


app.param('url', (req, res, next, url) => {
    if (validateUrl(url)) {
        next();
    } else {
        next(new Error('Invalid url: must be of the format http(s)://www.example.com'));
    }
});

app.get('/:url', (req, res) => {
    res.status(200)
        .json(JSON.stringify({}));
});

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json(Object.assign({
        message: err.message
    }, app.get('env') === 'development' ? {
        error: err
    } : {}));
});

mongo.connect(URL, (err, db) => {
    if (err) {
        console.log('Cannot connect to database');
    } else {
        const urls = db.collection('urls');
        db.close(); 
    }
});

const server = app.listen(APP_PORT, () => console.log(`App connected to port: ${server.address().port}`));