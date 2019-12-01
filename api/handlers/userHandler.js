let mongoose = require('mongoose');
let User = require('../../db/models/userModel');

//this method add user 
function addUser(user, callback){
  try {
    if(user){
      console.log("im here 1")
      let newUser = new User(user);
      console.log("im here 2")
      newUser.save(callback);
    } else {
      console.log("im here addUser 2 err")
      throw new Error("Add User validation failed.")
    }
  } catch (error){
    console.log("add user handler error " + error)
    throw error;
  }


}


//this method find user by id and populate shopping bag
function findUser(user, callback){
  var query = {};
  query['email'] = user.email;
  User.findOne(query, {}, function(err, user){
      if(err){
          callback(new Error("couldn't find user. Invalid data"));
      } else{
          if(user !== null){
              callback(null, user);
          } else {
              callback(new Error("couldn't find user. Invalid data"));
          }
          
      }
  });
}


function findUserByUniqueField(uniqueField, valueOfUniqueField, callback){
  var query = {};
  query[`${uniqueField}`] = valueOfUniqueField;
  User.findOne(query)
  .exec(function(err, user){
      if(err){
          callback(err);
      } else{
          if(user !== null){
              callback(null, user);
          } else{
              callback(new Error("couldn't find user by unique field"));
          }
      }
  })
}


module.exports = {
  addUser,
  findUser,
  findUserByUniqueField
}