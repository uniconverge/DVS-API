const mongoose = require('mongoose');

const statusSchema =mongoose.Schema({
    value:{
        type:String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Device'
    }
},{
    timestamps:true
})

const Status = mongoose.model('Status',statusSchema);

module.exports =Status;
