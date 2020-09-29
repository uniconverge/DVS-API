const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://broker.hivemq.com')
const Device =require('../model/device')
const Sensor = require('../model/sensorEnable')


var state = 'closed'

client.on('connect', () => {
  console.log('client')
  client.publish('solarcleaners/connected', 'true');
  (async()=>{
    try{
      setInterval(async ()=>{
        const devices=await Device.find({});
        const sensors=await Sensor.find({});
        var obj=[];
        for(var i=0;i<devices.length;i++){
          // console.log(devices[i]._id,sensors[i].deviceid);
          obj.push(
                {
                      //id:"5effccb32fed7700171dc95f",
                      id:devices[i]._id,
                      status:Math.floor(Math.random() * (15+i))%3===0?'off':'on',
                      temperature:sensors[i].temperature==true? 15+ Math.floor(Math.random() * (20+i)):null,
                      humidity:sensors[i].humidity==true?10 + Math.floor(Math.random() * (14+i)):null,
                      solarVoltage:sensors[i].solarvoltage==true?1.3+ Math.floor(Math.random() * (4+i)):null,
                      batteryVoltage:sensors[i].batteryvoltage==true?5+Math.floor(Math.random() * (6+i)):null
                }
          );
        }
        // console.log(" ")
        client.publish('solarcleaners/parameters',JSON.stringify(obj))
      },1000)
    }
    catch(e){
      console.log(e);
    }
  })();
  
})
