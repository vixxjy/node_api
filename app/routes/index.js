const noteRoutes = require('./noteRoutes');

module.exports = function(app, db) {
    noteRoutes(app, db);
    // Other route groups could go here, in the future
};