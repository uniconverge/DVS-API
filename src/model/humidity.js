const mongoose = require('mongoose');

const humSchema =mongoose.Schema({
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

const Humidity = mongoose.model('Humidity',humSchema);

module.exports =Humidity;