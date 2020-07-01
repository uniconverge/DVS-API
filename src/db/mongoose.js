const mongoose =require('mongoose');
//
mongoose.connect(MONGODB_URL,{
    useNewUrlParser:true,
    useCreateIndex:true
}).then((result)=>{
    console.log('connected to mongodb')
}).catch((e)=>{
    console.log('cannot connect to mongodb')
})