const express = require('express');
const app = express();
const port = 3001;
const path = require("path");
const routes = require('./api/routes/apiRoutes');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongo = require("./db/mongooseInit.js");
const rateLimit = require("express-rate-limit");
const cors = require('cors')
 
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});


app.use(cors())

//  apply to all requests
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/app',routes);

app.listen(port, () => console.log(`listening on port ${port}!`));

// set status and forward to error handler
app.use(function(req, res, next) {
    res.status(404).send('route not found')
});
  
// error handler
app.use(function(err, req, res, next) {
    res.status(500);
    if(err.message === undefined){
        res.send(err);
    } else{
        res.send(err.message);
    }
});

module.exports = app;

