const express =require('express');
const Alert = require('../model/alert');
const router =express.Router()

router.get('/alert',async(req,res)=>{
    try{
        const alert=await Alert.find({});
         res.send(alert);
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
module.exports=router;