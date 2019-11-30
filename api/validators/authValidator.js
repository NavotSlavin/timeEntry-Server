const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');
const secretKey = config.get('jwt.secretKey');

//this mathod verify users token
function verifyToken(req, res, next){
    jwt.verify(req.headers['token'], secretKey, (err, authData) => {
        if(err){
            next(err);
        } else{
            next();
        }
    })
}

module.exports = {
    verifyToken
}