let mongoose = require('mongoose');

//connecting to db
mongoose.connect('mongodb://localhost:27017/eLoomina');

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log('DB connection success');
})

module.exports = {

};