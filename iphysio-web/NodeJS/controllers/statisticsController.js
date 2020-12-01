const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var security = require('./security');

//require('mongoose').set('debug', true);

var { Statistics } = require('../models/statistics');


// => localhost:3000/Statistics/
router.get('/:patientId', security.verifyToken, (req, res) => {
    Statistics.find((err, docs) => {
        if (!err) {res.send(docs); }
        else { console.log('Error in Retrieving Statistics : ' + JSON.stringify(err, undefined, 2)); }
    });
});