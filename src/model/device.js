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


deviceSchema.methods.toJSON =function(){
    const device =this;
    const deviceObject= device.toObject()
    deviceObject.temperature=device.temperature.map((item)=>item.value)
    deviceObject.humidity=device.humidity.map((item)=>item.value)
    deviceObject.solarVoltage=device.solarVoltage.map((item)=>item.value)
    deviceObject.batteryVoltage=device.batteryVoltage.map((item)=>item.value)
    deviceObject.status=device.status[0].value;
    return deviceObject
}
Device =mongoose.model('Device',deviceSchema)

module.exports=Device
