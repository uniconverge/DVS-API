const mongoose = require('mongoose');

const solarSchema =mongoose.Schema({
    value:{
        type:Number
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Device'
    }
},{
    timestamps:true
})

const SolarVoltage = mongoose.model('SolarVoltage',solarSchema);

module.exports =SolarVoltage;