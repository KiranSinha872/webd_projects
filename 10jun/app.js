const express = require('express')
const fs= require('fs')
const app = express()
const port = 3000
app.set("view engine", "ejs");///template setting for slecting ejs 
let dipesh={
    name:"dipesh singh",
    roll:30,
    age:20
}

app.get("/",(req,res)=>{
    // res.send("Home page ")
  // In app.js (Line 10)
let color="red";
res.render("user", {dipesh,color});
})




app.listen(3000,()=>{
    console.log(`app is running at port${port}`)
})