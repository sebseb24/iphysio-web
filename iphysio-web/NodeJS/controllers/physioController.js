const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Physio } = require('../models/physios');

router.get('/:email', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id :  + ${res.params.id};');

    Patient.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in retrieving Physio : ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var phy = new Physio({
        name: req.body.name,
        email: req.body.email,
        hash: req.body.hash,
        salt: req.body.salt
    });

    phy.save((err, doc) => {
        if (!err) {res.send(doc); }
        else { console.log('Error in Physio Save : ' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;