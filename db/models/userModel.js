
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
const constantSalt = 10;

var User = new Schema({
    name: {
        type: String,
        required:'name is required'
    },
    user_name: {
        type: String,
        required:'user_name is required'
    },
    email:{
        type: String,
        unique:true,
        required:'email is required'
    },
    address:{
        type: String,
        required:'address is required'
    },
    password:{
        type: String,
        required:'password is required' 
    }
},
    {
        versionKey: false,
        timestamps: true
    }
);


User.set('toJSON', {
    transform:function(doc, ret, options){
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.password;
        ret.token = doc.token;
        return ret;
    }
});

User.methods.hashPassword = function (password, callback) {
    bcrypt.hash(password, constantSalt, function(err, hash){
        if(err){
            return next(err);
        } else{
            callback(null, hash);
        }
    });
}

User.pre('save', function(next){
    var user = this;
    //checks if this is our first save or update,make sure that we hash the password only in the first time
    if(user.isNew) {
        bcrypt.hash(user.password, constantSalt, function(err, hash){
            if(err){
                return next(err);
            } 
            user.password = hash;
            next();
        });
    } else {
        next();
    }
});

module.exports = mongoose.model('User', User);