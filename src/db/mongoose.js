const mongoose =require('mongoose');
//
mongoose.connect('mongodb+srv://Task_App:Alen223@thankz@cluster0-ddvww.mongodb.net/skilancer',{
    useNewUrlParser:true,
    useCreateIndex:true
}).then((result)=>{
    console.log('connected to mongodb')
}).catch((e)=>{
    console.log('cannot connect to mongodb')
})