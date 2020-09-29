const mongoose = require('mongoose');

const alertSchema =mongoose.Schema({
    temperature:{
        type:Number
    },
    humidity:{
        type:Number
    },
    solarvoltage:{
        type:Number
    },
    batteryvoltage:{
        type:Number
    }
})

const Alert = mongoose.model('Alert',alertSchema);

module.exports =Alert;