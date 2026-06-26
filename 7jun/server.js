 const express =require("express")
const app= express();
const port = 3000;
const fs = require("fs");
app.use("/",(req,res,next)=>{const timestamp=new Date();
    console.log(timestamp);
    const log = `client data = ${timestamp}\n`;
    fs.appendFileSync("log.txt",log,"utf-8")//to write it in log.txt file note it down 
    next();
})
app.get("/",(req,res)=>{res.send("home page...")})

app.post("/register",(req,res)=>{res.send("user registeration confirmed..")})
app.listen(3000,()=>{
    console.log(`app is running on ${port}`)
})
