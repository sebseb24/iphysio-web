const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');

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

    phy.save((err, registeredUser) => {
        if (!err) {
            let payload = { subject: registeredUser._id };
            let token = jwt.sign(payload, 'secretKey');
            res.status(200).send({token}); 
        }
        else { console.log('Error in Physio Save : ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/login', (req, res) => {
    let userData = req.body;

    Physio.findOne({email: userData.email}, (error, user) => {
        if(error) {
            console.log(error);
        }
        
        else {
            if(!user) {
                res.status(401).send('Email invalide');
            }

            else {
                if(user.hash !== userData.hash) {
                    res.status(401).send('Mot de passe invalide');
                }

                else {
                    let payload = { subject: user._id };
                    let token = jwt.sign(payload, 'secretKey');
                    res.status(200).send({token});
                }
            }
        }
    });
});

module.exports = router;