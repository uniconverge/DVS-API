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
    // status:{
    //     type:String,
    //     default:'Off'
    // },
    // temperature:[
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Temperature'
    //     }
    // ],
    // humidity:[
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Humidity'
    //     },
    // ],
    // solarVoltage:[
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'SolarVoltage',
    //         localField: '_id',
    //         foreignField: 'owner'
    //     },
    // ],
    // batteryVoltage:[
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'BatteryVoltage'
    //     },
    // ],
    imagePath:{
        type:String
    }
},{
    timestamps:true
})
deviceSchema.virtual('status', {
    ref: 'Status',
    localField: '_id',
    foreignField: 'owner'
})
deviceSchema.virtual('temperature', {
    ref: 'Temperature',
    localField: '_id',
    foreignField: 'owner'
})
deviceSchema.virtual('humidity', {
    ref: 'Humidity',
    localField: '_id',
    foreignField: 'owner'
})
deviceSchema.virtual('solarVoltage', {
    ref: 'SolarVoltage',
    localField: '_id',
    foreignField: 'owner'
})
deviceSchema.virtual('batteryVoltage', {
    ref: 'BatteryVoltage',
    localField: '_id',
    foreignField: 'owner'
})
deviceSchema.set('toJSON', { virtuals: true });
deviceSchema.methods.toJSON =function(){
    const device =this;
    const deviceObject= device.toObject()
    if(device.temperature!=[]){
        deviceObject['temperature']=device.temperature.map((item)=>item.value)
    }
    if(device.humidity!=[]){
        deviceObject["humidity"]=device.humidity.map((item)=>item.value)
    }
    if(device.solarVoltage!=[]){
        deviceObject["solarVoltage"]=device.solarVoltage.map((item)=>item.value)
    }
    if(device.batteryVoltage!=[]){
        deviceObject["batteryVoltage"]=device.batteryVoltage.map((item)=>item.value)
    }
    if(device.status!=[]){
        deviceObject["status"]=device.status.map((item)=>item.value)
    }
    delete deviceObject.createdAt
    delete deviceObject.updatedAt
    delete deviceObject.__v
    return deviceObject
}
// deviceSchema.post('save',async function(next){
//     const device =this
//     await device.populate({path:'temperature',options:{limit:5,sort:{createdAt:-1}}})
//     .populate({path:'humidity',options:{limit:5,sort:{createdAt:-1}}})
//     .populate({path:'solarVoltage',options:{limit:5,sort:{createdAt:-1}}})
//     .populate({path:'batteryVoltage',options:{limit:5,sort:{createdAt:-1}}})
//     .populate({path:'status',options:{limit:1,sort:{createdAt:-1}}})
//     .execPopulate()
//     next()
// })
Device =mongoose.model('Device',deviceSchema)

module.exports=Device
