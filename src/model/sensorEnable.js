const mongoose = require('mongoose');

const sensorSchema =mongoose.Schema({
    deviceid:{
        type:String,
    },
    temperature:{
        type:Boolean,
    },
    humidity:{
        type:Boolean,
    },
    solarvoltage:{
        type:Boolean,
    },
    batteryvoltage:{
        type:Boolean,
    },
})

const Sensor = mongoose.model('Sensor',sensorSchema);

module.exports =Sensor;