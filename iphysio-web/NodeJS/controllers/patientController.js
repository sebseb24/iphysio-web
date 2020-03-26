const jwt = require('jsonwebtoken');
const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Patient } = require('../models/patients');

router.get('/', verifyToken, (req, res) => {
    Patient.find((err, docs) => {
        if (!err) {res.send(docs); }
        else { console.log('Error in Retrieving Patients : ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:physio_associe_id', (req, res) => {
    Patient.find(
        { physio_associe: req.params.physio_associe_id },
        (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in retrieving Patient : ' + JSON.stringify(err, undefined, 2)); }
        }
    )
});

router.post('/', (req, res) => {
    var emp = new Patient({
        name: req.body.name,
        email: req.body.email
    });

    emp.save((err, doc) => {
        if (!err) {res.send(doc); }
        else { console.log('Error in Patient Save : ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id :  + ${res.params.id};');

        var emp = new Patient({
            name: req.body.name,
            email: req.body.email,
        });

        Patient.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in Patient Update: ' + JSON.stringify(err, undefined, 2)); }
        });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id :  + ${res.params.id};');

        Patient.findByIdAndRemove(req.params.id, (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in Patient Delete: ' + JSON.stringify(err, undefined, 2)); }
        });
});

function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
        return res.status(401).send('Unauthorized request');
    }

    let token = req.headers.authorization.split(' ')[1];
    if(token === 'null') {
        return res.status(401).send('Unauthorized request');
    }

    let payload = jwt.verify(token, 'secretKey');
    if(!payload) {
        return res.status(401).send('Unauthorized request');
    }

    req.userId = payload.subject;
    next();
}

module.exports = router;