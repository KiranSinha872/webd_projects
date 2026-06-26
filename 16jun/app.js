const { name } = require('ejs');
const express=require('express')
const app= express()
const fs=require('fs')
const port = 3000;
const mongoose=require('mongoose')
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.set("view engine", "ejs");
app.get("/",async(req,res)=>{
    let allstudent= await Student.find();
    let obj = {
        "name":"parth",
        age:20
    }
    console.log(allstudent)
    //  res.send(allstudent)
    let filteredStudents = allstudent.filter((student) => {
            return student.age > 20; 
        });

        console.log(filteredStudents);
        
        // 3. EJS file ko ab hum filtered data bhejenge
        res.render("students.ejs", { allstudent: filteredStudents });

    // res.render("students.ejs",{allstudent})
})





constmongoose=require("mongoose");

mongoose.connect("mongodb+srv://anshu:alpha@cluster1.p36btqc.mongodb.net/?appName=Cluster1")
.then(() =>console.log("DB Connected"))
.catch(err =>console.log(err));
const studentSchema=new mongoose.Schema({
  name:"String",
  age:Number,
  email:"String"
});
//pehle schema desgin hoga phir model banega //


const Student = mongoose.model("Student",studentSchema);


app.get("/insertdata",(req,res)=>{
    res.render("form.ejs")
})







app.post("/createdata",async(req,res)=>{
     let obj = {
        "name":"parth",
        age:20,
        "course":"webd"
    };
    console.log(req.body)
    let data = await  Student.create(obj);
    console.log(data)
    res.send("data saved")
})




app.listen(3000,()=>{
 console.log(`server is working on ${port}`)
})