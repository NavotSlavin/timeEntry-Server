let mongoose = require('mongoose');
let TimeEntry = require('../../db/models/timeEntryModel.js');


function getTimeEntries(userId, callback){
  TimeEntry.find({ userId : userId }, (err, timeEntries) => {
      if (err) callback(new Error("couldn't get time entries."));
      else {
          callback(null, timeEntries)
      }
  });
}

function addTimeEntry(timeEntry, callback){
  try{
    //convert user id sting to mongo id
    timeEntry.userId = mongoose.Types.ObjectId(timeEntry.userId);
    let newTimeEntry = new TimeEntry(timeEntry);
    newTimeEntry.save(callback);
  } catch( error){
      throw new Error("Couldn't create time entry.")
  }

}


module.exports = {
  getTimeEntries,
  addTimeEntry
}