const mongo = require('mongodb').MongoClient;
const express = require('express');

const MONGO_PORT = 28017;
const APP_PORT = process.env.PORT || 8080;
const DB_NAME = 'urls-database';
const URL = `mongodb://localhost:${MONGO_PORT}/${DB_NAME}`;

const app = express();

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.log(`Err status: ${err.status}`);
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: app.get('env') === 'development' ? err : {}
    });
});

// app.param('url', (req, res, next, value) => {
//     next();
// });

app.get('/:url', (req, res) => {
    res.status(200)
        .json(JSON.stringify({}));
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