const express =require('express');
const Alert = require('../model/alert');
const Points = require('../model/points');
const router =express.Router()

router.get('/alert',async(req,res)=>{
    try{
        const alerts=await Alert.find({});
         res.send(alerts);
    }catch(e){
        res.send(e);
    }
})
router.post('/alert',async(req,res)=>{
    try{
        const alert=new Alert(req.body);
        await alert.save();
        res.send(alert);
    }catch(e){
        res.send(e);
    }
})
router.patch('/alert/:id',async(req,res)=>{
    try{
        const alert=await Alert.findByIdAndUpdate(req.params.id,req.body,{new:true});
         res.send(alert);
    }catch(e){
        res.send(e);
    }
})



router.get('/nopoints',async(req,res)=>{
    try {
        const nopoints =await Points.find({});
        res.send(nopoints[0]);
    } catch (e) {
        res.send(e);
    }
})
router.post('/nopoints/:id',async(req,res)=>{
    try {
        const nopoints =new Points({value:req.params.id});
        await nopoints.save();
        res.send(nopoints);
    } catch (e) {
        res.send(e);
    }
})

router.patch('/nopoints/:id',async(req,res)=>{
    try {
        const nopoints =await Points.find({});
        const points =await Points.findByIdAndUpdate(nopoints[0]._id,{value:req.params.id},{new:true})

        res.send(points);
    } catch (e) {
        console.log(e)
        res.send(e);
    }
})

module.exports=router;