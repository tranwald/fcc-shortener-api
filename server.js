const mongo = require('mongodb').MongoClient;
const express = require('express');

const MONGO_PORT = 28017;
const APP_PORT = process.env.PORT || 8080;
const DB_NAME = 'learnyoumongo';
const URL = `mongodb://localhost:${MONGO_PORT}/${DB_NAME}`;

const app = express();

//app.param();

mongo.connect(URL, (err, db) => {
    if (err) {
        console.log('Cannot connect to database');
    } else {
       db.close(); 
    }
});

const server = app.listen(APP_PORT, () => console.log(`App connected to port: ${server.address().port}`));