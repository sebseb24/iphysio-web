const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Patient } = require('../models/patients');
var { Programme } = require('../models/programme');

// => localhost:3000/Patients/
router.get('/', (req, res) => {
    Patient.find((err, docs) => {
        if (!err) {res.send(docs); }
        else { console.log('Error in Retrieving Patients : ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:patientId', (req, res) => {
    /*if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id :  + ${res.params.id};');

    Patient.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in retrieving Patient : ' + JSON.stringify(err, undefined, 2)); }
    });*/

    Programme.find({ patientId : req.params.patientId}, (err, pro) => {

        if (!err) { res.send(pro); }
        else { console.log('Error in retrieving Patient : ' + JSON.stringify(err, undefined, 2));
            res.status(400).send('Error in retrieving programmes : ' + JSON.stringify(err, undefined, 2));
        }

    });
});

router.delete('/:id', (req, res) => {

    Programme.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Programme Delete: ' + JSON.stringify(err, undefined, 2)); }
    });

});

router.post('/', (req, res) => {
    var pro = new Programme({
        nom: req.body.nom,
        patientId : req.body.patientId
    });

    pro.save((err, doc) => {
        if (!err) {res.send(doc); }
        else { console.log('Error in Patient Save : ' + JSON.stringify(err, undefined, 2)); }
    });
});

/*router.put('/', (req, res) => {

    Patient.findById(req.body.patientId, (err, pat) => {
        if(!err) {

            pat.programmes.push(req.body.programmes);
            pat.save((err, doc) => {
                console.log(pat.programmes);


                if(!err) {res.send(doc)}
            });
            

            
            

        }
        else { 
            console.log('Error in retrieving Patient : ' + JSON.stringify(err, undefined, 2)); 
        }
    })


});*/



router.put('/', (req, res) => {



    /*Patient.findById(req.body.patientId, (err, pat) => {

        if(err) {
            res.send(err)
        }
        else {
            //res.send(pat)


            pat.findById(req.body.programme.id, (err, pro) => {

                    if(err) {
                        res.send(err);
                    } else {
                        res.send(pro);
                    }


            });
        }


    });*/

    let query = {

        "_id" : req.body.patientId,

    };

    /*
            "programmes" : {
            "$elemMatch" : {"_id" : req.body.programme.id}
        }
    */
    
    let update =  {"$set": {'programmes.$[programme].name': req.body.programme.name } };
    let options = {   "arrayFilters": [{ 'programme._id': req.body.programme.id }]};
    
    // update the document
    Patient.updateOne(query, update, options ,function(error, result) {
        if (error) {
            res.send(error);
        } else {
            res.send(result);
        }
    });

    /*Patient.findById(req.body.patientId)
    .then((pat) => {
      const programme = pat.programmes.find(o => o._id === req.body.programme.id ); // returns a matching subdocument
      programme.set(req.body.programme); // updates the address while keeping its schema       
      // address.zipCode = req.body.zipCode; // individual fields can be set directly
  
      return Patient.save(); // saves document with subdocuments and triggers validation
    })
    .then((pat) => {
      res.send({ pat });
    })
    .catch(e => res.status(400).send(e.message));*/



  

    /*Patient.findOneAndUpdate(query, update, options)
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });*/

});



module.exports = router;