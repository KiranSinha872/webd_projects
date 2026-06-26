const express= require('express')
const app= express()
const port=3000
const fs=require("fs")
app.get("/",(req,res)=>{
    // res.send("home page")
    res.sendFile("index.html",{root:__dirname})
})

app.listen(3000,()=>{
    console.log(`app is running on ${port}`)
})