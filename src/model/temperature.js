const mongoose = require('mongoose');

const tempSchema =mongoose.Schema({
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

const Temperature = mongoose.model('Temperature',tempSchema);

module.exports =Temperature;