let userHandler = require('../handlers/userHandler.js');
const jwt = require('jsonwebtoken');
const config = require('config');
const secretUserKey = config.get('jwt.secretKey');
const authUtil = require('../../api/utils/authUtil.js');

//this method add user to the db
function addUser(req, res, next){
    try{
        userHandler.addUser(req.body, function(err, user){
            if(err){
                next(err);
            } else{
                res.locals["userData"] = user;
                next();
            }
        });
    } catch(err){
        throw err;
    }

}

function authenticate(req, res, next) {
    const uniquFieldOfUser = "email"
    const uniquFieldValue = req.body[uniquFieldOfUser];
    userHandler.findUserByUniqueField(uniquFieldOfUser, uniquFieldValue, (err, user) => {
        if (err) {
            //user doesn't exist -> can't login
            next(err);
        } else {
            //user exist-> compare plain password and hashed password       
            authUtil.comparePasswords(req.body.password, user.password, (err) => {
                if(err){
                    //password isn't correct
                    next(err);
                } else{
                    res.locals["userData"] = user;
                    next();
                }
            })
        }
    });
}


//this method sign user and send the token of the user
function signUser(req,res,next){
    //first param is the payload, second param is the privatekey
    //async - this token will be valid for 3h
    jwt.sign({user:res.locals["userData"]}, secretUserKey, { expiresIn: '1h' }, (err, token) => {
        if(err) throw err;
        var userToSend = res.locals["userData"]
        userToSend.token = token
        res.send(userToSend);
    });
}



module.exports = {
   addUser,
   authenticate,
   signUser
};