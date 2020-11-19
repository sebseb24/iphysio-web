const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var { Exercice } = require('../models/exercices');

router.get('/', (req, res) => {


    Exercice.find({isActive : true},(err, docs) => {
        if (!err) {res.send(docs); }
        else { console.log('Error in Retrieving Exercices : ' + JSON.stringify(err, undefined, 2)); }
    } );


});

router.post('/', (req, res) => {

    
});



module.exports = router;