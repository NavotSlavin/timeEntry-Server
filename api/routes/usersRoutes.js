/**
 * This module routes any URL that starts with: '../shozi'
 */
var express = require('express');
var router = express.Router();
let userController = require("../controllers/usersController.js");


//sign up a new user
router.route('/register')
    .post(userController.addUser, userController.signUser);

router.route('/login')
    .post(userController.authenticate, userController.signUser)

//------------------------------------- validating token -------------------------------------//
//------------------------------------- from here all the request are token valid  -------------------------------------//

// router.use(userController.verifyCookie);


module.exports = router;