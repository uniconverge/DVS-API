const Device =require('../model/device')
const express =require('express')
const Temperature = require('../model/temperature')
const Humidity =require('../model/humidity')
const BatteryVoltage=require('../model/batteryvoltage')
const SolarVoltage =require('../model/solarvoltage')
const Status =require('../model/status')
const router =express.Router()

// router.post('/devices',async (req,res)=>{
//     try{
//         const device= new Device(req.body)
//         await device.save()
//         const temp = new Temperature({owner:device._id,value:0})
//         await temp.save()
//         const stats = new Status({owner:device._id,value:'off'})
//         await stats.save()
//         const hum = new Humidity({owner:device._id,value:0})
//         await hum.save()
//         const sv = new SolarVoltage({owner:device._id,value:0})
//         await sv.save()
//         const bv = new BatteryVoltage({owner:device._id,value:0})
//         await bv.save()
//         // await device
//         // .populate({path:'temperature',options:{limit:5,sort:{createdAt:-1}}})
//         // .populate({path:'humidity',options:{limit:5,sort:{createdAt:-1}}})
//         // .populate({path:'solarVoltage',options:{limit:5,sort:{createdAt:-1}}})
//         // .populate({path:'batteryVoltage',options:{limit:5,sort:{createdAt:-1}}})
//         // .populate({path:'status',options:{limit:1,sort:{createdAt:-1}}})
//         // .execPopulate()
//         res.status(200).send()
//     }
//     catch(e){
//         res.status(400).send(e)
//     }
// })
router.get('/device',async (req,res)=>{
    try{
        const devices=await Device.find({}).sort({_id:-1}).limit(1)
        //console.log(devices[0])
        res.status(200).send(devices[0])
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.get('/devices',async (req,res)=>{
    try{
        //console.log("-------------------------------------")
        const devices=await Device.find({})
        await devices[0].populate({path:'temperature',options:{limit:5,sort:{createdAt:-1}}})
        .populate({path:'humidity',options:{limit:5,sort:{createdAt:-1}}})
        .populate({path:'solarVoltage',options:{limit:5,sort:{createdAt:-1}}})
        .populate({path:'batteryVoltage',options:{limit:5,sort:{createdAt:-1}}})
        .populate({path:'status',options:{limit:1,sort:{createdAt:-1}}})
        .execPopulate()
        await devices[1].populate({path:'temperature',options:{limit:5,sort:{createdAt:-1}}})
        .populate({path:'humidity',options:{limit:5,sort:{createdAt:-1}}})
        .populate({path:'solarVoltage',options:{limit:5,sort:{createdAt:-1}}})
        .populate({path:'batteryVoltage',options:{limit:5,sort:{createdAt:-1}}})
        .populate({path:'status',options:{limit:1,sort:{createdAt:-1}}})
        .execPopulate()
        await devices[2].populate({path:'temperature',options:{limit:5,sort:{createdAt:-1}}})
        .populate({path:'humidity',options:{limit:5,sort:{createdAt:-1}}})
        .populate({path:'solarVoltage',options:{limit:5,sort:{createdAt:-1}}})
        .populate({path:'batteryVoltage',options:{limit:5,sort:{createdAt:-1}}})
        .populate({path:'status',options:{limit:1,sort:{createdAt:-1}}})
        .execPopulate()
        res.status(200).send(devices.reverse())
        res.status(200).send(devices.reverse())
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.get('/devices/:id',async (req,res)=>{

    try{
        //console.log(req.req.params['id'])
        const device =await Device.findOne({_id:req.params['id']})
        await device
        .populate({path:'temperature',options:{limit:5,sort:{createdAt:-1}}})
        .populate({path:'humidity',options:{limit:5,sort:{createdAt:-1}}})
        .populate({path:'solarVoltage',options:{limit:5,sort:{createdAt:-1}}})
        .populate({path:'batteryVoltage',options:{limit:5,sort:{createdAt:-1}}})
        .populate({path:'status',options:{limit:1,sort:{createdAt:-1}}})
        .execPopulate()
        res.status(200).send(device)
    }catch(e){
        res.status(400).send(e);
    }
})

router.patch('/devices/:id',async(req,res)=>{
    try{
        const device = await Device.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        res.status(200).send(device)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/devices/:id',async (req,res)=>{
    try{
        const device =await Device.findByIdAndDelete(req.params.id)

        if(!device){
            res.status(400).send({error:'device not found'})
        }
        res.status(200).send(device)
    }catch(e){
        res.status(400).send(device)
    }
})



module.exports=router
