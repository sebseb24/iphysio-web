const mongoose = require('mongoose');


var Statistics = mongoose.model('Statistics', {
    
}, 'statistics');

module.exports = { Statistics };