const Device =require('../model/device')
const express =require('express')
const Sensor = require('../model/sensorEnable')
const router =express.Router()

router.post('/devices',async (req,res)=>{
    //console.log(req.body)
    const device= new Device(req.body)
    // console.log(device);
    const sensor =new Sensor({
        deviceid:device._id,
        temperature:false,
        humidity:false,
        solarvoltage:false,
        batteryvoltage:false,
    })
    try{
        await device.save()
        await sensor.save()
        res.status(200).send()
    }
    catch(e){
        res.status(400).send(e)
    }
})
//just to check git
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
        var number=5;
        if(req.query.number){
           number=req.query.number;
        }
        const devices=await Device.find({})
        var i=0
        while(i<devices.length){
            await devices[i].populate({path:'temperature',options:{limit:number,sort:{createdAt:-1}}})
            .populate({path:'humidity',options:{limit:number,sort:{createdAt:-1}}})
            .populate({path:'solarVoltage',options:{limit:number,sort:{createdAt:-1}}})
            .populate({path:'batteryVoltage',options:{limit:number,sort:{createdAt:-1}}})
            .populate({path:'status',options:{limit:1,sort:{createdAt:-1}}})
            .execPopulate()
            i++
        }

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
        res.status(200).send()
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/devices/:id',async (req,res)=>{
    try{
        const device =await Device.findByIdAndDelete(req.params.id)
        const sensor =await Sensor.deleteOne({deviceid:req.params.id});
        if(!device){
            res.status(400).send({error:'device not found'})
        }
        res.status(200).send()
    }catch(e){
        res.status(400).send(e)
    }
})





module.exports=router
