/**
 * This module routes any URL that starts with: '../shozi'
 */
var express = require('express');
var router = express.Router();
let timeEntryController = require("../controllers/timeEntryController.js");
let authValidator = require('../validators/authValidator.js')

router.use(authValidator.verifyToken);
router.route('/')
    .get(timeEntryController.getTimeEntries)
    .post(timeEntryController.addTimeEntry);

module.exports = router;