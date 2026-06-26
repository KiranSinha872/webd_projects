const express=require("express")
const mongoose=require("moongoose")
const app = express()


constmongoose=require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/HITECH")
.then(() =>console.log("DB Connected"))
.catch(err =>console.log(err));
app.get("/",(res,req)=>{
    console.log(req.param);
    res.json({
        "name":"vikas",
        "college":"kanpur university"
    })

})
app.listen(3000,()=>{
    console.log("app is running at local host")
})