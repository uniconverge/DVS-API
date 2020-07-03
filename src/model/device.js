const mongoose= require('mongoose')

const deviceSchema =mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    modelNo:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        
    },
    runTime:{
        type:Number,
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
    imagePath:{
        type:String
    }
},{
    timestamps:true
})

deviceSchema.toJSON=function(){
    const device=this
    const deviceObject =device.toObject();
    deviceObject.id='helo'
    
    return deviceObject;
}
Device =mongoose.model('Device',deviceSchema)

module.exports=Device