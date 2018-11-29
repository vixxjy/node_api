const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const app            = express();

// setting up the port
const port = 8000;

//handling url encoded form
app.use(bodyParser.urlencoded({ extended: true }));

// setting up the db connection
MongoClient.connect(db.url, (err, database) => {
    if (err) {
        return console.log(err);
    }
    // For mongodb v.3+ Make sure you add the database name and not the collection name
    // db = database.db("note-api")
    // require('./app/routes')(app, db);

    // importing the routes
    require('./app/routes')(app, database);

    // listening for http requests
    app.listen(port, () => {
        console.log('We are live on ' + port);
      });
})
