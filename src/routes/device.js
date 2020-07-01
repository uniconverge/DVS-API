const Device =require('../model/device')
const express =require('express')
const router =express.Router()

router.post('/devices',async (req,res)=>{
    const device= new Device(req.body)
    try{
        await device.save()
        res.status(200).send(device)
    }
    catch(e){
        res.status(400).send(e)
    }
})


router.get('/devices',async (req,res)=>{
    try{
        const devices=await Device.find({})
        res.status(200).send(devices)
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.get('/devices/:id',async (req,res)=>{
    try{
        const device =await Device.findOne({_id:req.params['id']})
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