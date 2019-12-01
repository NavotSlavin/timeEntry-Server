let timeEntryHandler = require('../handlers/timeEntryHandler.js');

//this method add admin to the db
function addTimeEntry(req, res, next){
    timeEntryHandler.addTimeEntry(req.body, function(err, timeEntry){
        if(err){
            next(err);
        } else{
            res.send(timeEntry);
        }
    });
}

function getTimeEntries(req,res,next){
    const userId = req.query.id;
    const token = req.headers.token;
    console.log("userId " + userId + "token " + token)
    timeEntryHandler.getTimeEntries(userId, function(err, timeEntries){
        if(err){
            next(err);
        } else{
            res.send(timeEntries);
        }
    });
}

module.exports = {
    addTimeEntry,
    getTimeEntries
}