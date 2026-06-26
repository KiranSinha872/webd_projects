const express=require("express")
const app= express();
const data = require("./data.json")
console.log(data)
// app.use((req,res,next)=>{
//     console.log("middle ware 1 ")
//     let auth=true;
//     if(!auth){
//         res.send("auth failed .. try again")
//     }
//     else{
//         next();
//     }
// })
app.use((req,res,next)=>{
    let out= `url=${req.url}and address is ${req.ip}`;
    console.log(out)
    let auth=true;
    if(!auth){
        res.send("auth failed .. try again")
    }
    else{
        next();
    }
})



app.get("/",(req,res)=>{res.send("home page ..")})
app.get("/about",(req,res)=>{
    res.send("about page ")
})





app.listen(3000,()=>{
    console.log("server is running at 3000")
})