const express =require('express')
const Sensor = require('../model/sensorEnable')
const router =express.Router()

router.patch('/sensors/:id',async(req,res)=>{
    try{
        const sensor =await Sensor.findOneAndUpdate({deviceid:req.params.id},req.body,{new:true});
        console.log(sensor)
        res.status(200).send(sensor)
    }catch(e){
        console.log(e);
        res.status(400).send(e)
        
    }
})
router.get('/sensors',async(req,res)=>{
    try{
        const sensors =await Sensor.find({});
        res.status(200).send(sensors)
    }catch(e){
        console.log(e);
        res.status(400).send(e)
        
    }
})
router.get('/sensors/:id',async(req,res)=>{
    try{
        const sensor =await Sensor.findOne({deviceid:req.params.id});
        res.status(200).send(sensor)
    }catch(e){
        console.log(e);
        res.status(400).send(e)
        
    }
})

module.exports=router;