
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TimeEntry = new Schema({
    task:{
        type: String,
        required:'task is required' 
    },
    project:{
        type: String,
        required:'project is required' 
    },
    startTime : {
        type: String,
        required:'startTime is required' 
    },
    endTime : {
        type: String,
        required:'endTime is required' 
    },
    userId : {type: Schema.Types.ObjectId, ref: 'User', required:'userId is required' }      
    },
    {
        versionKey: false,
        timestamps: true
    }
);


TimeEntry.set('toJSON', {
    transform:function(doc, ret, options){
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
    }
});


module.exports = mongoose.model('TimeEntry', TimeEntry);