const express= require('express')
const fs = require('fs')
const app= express()
const port =3000
app.get('/',(req,res)=>{
    res.json({
        "name":"anshu raj bisoyi",

    })
}) 
app.get("/search",(req,res)=>{

    console.log(req.query);
    res.send("data found at db")
})
app.get("/result/:year/:roll",(req,res)=>{
    console.log(req.params)
    res.send("fail h bhai ")
})
app.listen(3000,()=>{
    console.log(`server is working on ${port}`)
})