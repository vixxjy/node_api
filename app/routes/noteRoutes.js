const  ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    //create route
    app.post('/notes', (req, res) => {
        const note = {
            title: req.body.title,
            text: req.body.body
        }
        // inserting to db
        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            }
            else {
                res.send(result.ops[0]);
            }
        });
    });

    // Listing route
    // app.get('/notes', (req, res) => {
    //     db.collection('notes').find((err, result) => {
    //         if (err) {
    //             res.send({'error':'An error has occurred'});
    //         } else {
    //             res.send(result.ops[0]);
    //         }
    //     })
    // });

    // get a specific note route
    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {
            '_id': new ObjectID(id)
        }

        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(item);
            }
        });
    });

    // delete note route
    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        
        db.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send('Note ' + id + ' deleted!');
            } 
        });
    });

    // update note
    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = {  title: req.body.title, text: req.body.body };

        db.collection('notes').update(details, note, (err, result) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(note);
            } 
        });
    })
};