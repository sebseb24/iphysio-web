const express = require('express');
var router = express.Router();
var security = require('./security');

var { Exercice } = require('../models/exercices');

router.get('/',  security.verifyToken, (req, res) => {


    Exercice.find({isActive : true},(err, docs) => {
        if (!err) {res.send(docs); }
        else { console.log('Error in Retrieving Exercices : ' + JSON.stringify(err, undefined, 2)); }
    } );


});

module.exports = router;