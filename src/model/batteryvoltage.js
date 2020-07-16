const mongoose = require('mongoose');

const batterySchema =mongoose.Schema({
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

const BatteryVoltage = mongoose.model('BatteryVoltage',batterySchema);

module.exports =BatteryVoltage;