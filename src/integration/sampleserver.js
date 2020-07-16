const mqtt = require('mqtt')

const client = mqtt.connect('mqtt://broker.hivemq.com')
const Temperature =require('../model/temperature')
const Humidity =require('../model/humidity')
const BatteryVoltage =require('../model/batteryvoltage')
const SolarVoltage =require('../model/solarvoltage')
const Device =require('../model/device')
const Status =require('../model/status')
var connected = false

client.on('connect', () => {
  client.subscribe('solarcleaners/connected')
  client.subscribe('solarcleaners/parameters')
})

client.on('message', (topic, message) => {
    switch(topic){
        case 'solarcleaners/connected':{
                                         connected = (message.toString() === 'true');
                                         //console.log(connected)
                                         break;
                                    }
        case 'solarcleaners/parameters':{
                                        msg=message.toString()
                                        //console.log(msg)
                                        var asynk =async(msg)=>{
                                            //console.log(deviceId)
                                            try{
                                                const device=await Device.findOne({_id:msg.id})
                                               // console.log('helo')
                                                if(device){
                                                    // device.status=deviceStatus;
                                                    // device.temperature.pushdeviceTemp
                                                    // device.humidity=deviceHumidity
                                                    // device.solarVoltage=deviceSolarVoltage
                                                    // device.batteryVoltage=deviceBatteryVoltage
                                                    // await device.save()
                                                    //console.log(device._id)
                                                    statusObj =new Status({value:msg.status,owner:device._id})
                                                    await statusObj.save()
                                                    tempObj=new Temperature({value:msg.temperature,owner:device._id})
                                                    await tempObj.save()
                                                    humObj=new Humidity({value:msg.humidity,owner:device._id})
                                                    await humObj.save()
                                                    solarObj=new SolarVoltage({value:msg.solarVoltage,owner:device._id})
                                                    await solarObj.save()
                                                    batteryObj=new BatteryVoltage({value:msg.batteryVoltage,owner:device._id})
                                                    await batteryObj.save()
                                                }
                                            }catch(e){
                                                console.log('inside error')
                                            }
                                          }
                                          msg=JSON.parse(msg);
                                          msg.forEach((item)=>{

                                            asynk(item)
                                          })
                                          break;
                                   }

    }
})
