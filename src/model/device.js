const mongoose= require('mongoose')

const deviceSchema =mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    modelNo:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        default:'Off'
    },
    temperature:{
        type:Number,
    },
    humidity:{
        type:Number,
    },
    solarVoltage:{
        type:Number,
    },
    batteryVoltage:{
        type:Number,
    },
},{
    timestamps:true
})

Device =mongoose.model('Device',deviceSchema)

module.exports=Device