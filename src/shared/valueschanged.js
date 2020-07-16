var obj={
    count:3,
}

for(var i=0;i<devices.length;i++){
    (async function(){
       try{
          console.log("iside tryy")
          await devices[i].populate({path:'temperature',options:{limit:5,sort:{createdAt:-1}}})
          .populate({path:'humidity',options:{limit:5,sort:{createdAt:-1}}})
          .populate({path:'solarVoltage',options:{limit:5,sort:{createdAt:-1}}})
          .populate({path:'batteryVoltage',options:{limit:5,sort:{createdAt:-1}}})
          .populate({path:'status',options:{limit:1,sort:{createdAt:-1}}})
          .execPopulate()
       }catch(e){
         console.log("inside e")
       }
    }())
}
console.log(devices[3].Temperature)

  

module.exports=obj