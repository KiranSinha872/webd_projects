const mongoose=require('mongoose');

const mongoURL=process.env.MONGO_URI || 'mongodb://localhost:27017/LibraryDetails';
mongoose.connect(mongoURL);
const db=mongoose.connection;




db.on('connected',()=>{
    console.log("mongodb connected")
});
db.on('disconnected',()=>{
    console.log("mongodb disconnected")
});
db.on('error',(err)=>{
    console.log("mongodb connection error",err);
});


module.exports=db;






