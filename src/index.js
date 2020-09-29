const express =require('express')
const app =express()
require('./db/mongoose')

const port =process.env.PORT || 3000;
const cors =require('cors')
const deviceRouter =require('./routes/device')
const sensorRouter =require('./routes/sensor')
require('./integration/server-subscriber');
setInterval(()=>{
    require('./integration/sampleclient')
},3000)

app.use(cors({orgin:true}));
app.use(express.json())
app.use(deviceRouter)
app.use(sensorRouter)

app.listen(port,()=>{
    console.log(port+'is listnening');
})
