/**
 * This module routes any URL that starts with: '../'
 */
let express = require('express');
let router = express.Router();
let usersRoutes = require("./usersRoutes.js");
let timeEntries = require("./timeEntries.js");



router.use('/user',usersRoutes);
router.use('/time-entries',timeEntries);



module.exports = router;