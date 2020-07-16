const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://broker.hivemq.com')



var state = 'closed'

client.on('connect', () => {
    console.log('client')
  client.publish('solarcleaners/connected', 'true')
    setInterval(()=>{
    var obj1=[
      {
        id:"5f108caf90daca21681d3557",
        status:Math.floor(Math.random() * 15)%3===0?'on':'off',
        temperature:Math.floor(Math.random() * 27),
        humidity:Math.floor(Math.random() * 21),
        solarVoltage:Math.floor(Math.random() * 5.6),
        batteryVoltage:Math.floor(Math.random() * 11.9)
      },
      {
        id:"5f1085b0b1188829042d29e8",
        status:Math.floor(Math.random() * 15)%2===0?'on':'off',
        temperature:Math.floor(Math.random() * 22),
        humidity:Math.floor(Math.random() * 15),
        solarVoltage:Math.floor(Math.random() * 4.6),
        batteryVoltage:Math.floor(Math.random() * 9.9)
      },
      {
        id:"5f1085b5b1188829042d29ee",
        status:Math.floor(Math.random() * 15)%5===0?'on':'off',
        temperature:Math.floor(Math.random() * 32),
        humidity:Math.floor(Math.random() * 24),
        solarVoltage:Math.floor(Math.random() * 8.6),
        batteryVoltage:Math.floor(Math.random() * 15.9)
      }
    ]
  client.publish('solarcleaners/parameters',JSON.stringify(obj1))
  //client.publish('solarcleaners/parameters2',JSON.stringify(obj2))
//   client.publish('solarcleaners/parameters3',JSON.stringify(obj3))


  },1000)


})
