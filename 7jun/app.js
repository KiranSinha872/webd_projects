 const express =require("express")
const app= express();
const port = 3000;
const fs = require("fs");
const { extname } = require("path");
app.use(express.json());

app.use(express.urlencoded({extended :true}));


app.get("/",(req,res)=>{res.send("home page...")})

app.post("/register",(req,res)=>{
    console.log(req.body);
   fs.appendFileSync("data.json",JSON.stringify(req.body)+"\n","utf-8")
    res.send("user registeration confirmed..")})
app.listen(3000,()=>{
    console.log(`app is running on ${port}`)
})
