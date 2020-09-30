const mongoose = require('mongoose');

const pointsSchema =mongoose.Schema({
    value:{
        type:Number
    },
})

const Points = mongoose.model('Points',pointsSchema);

module.exports =Points;