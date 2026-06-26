const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// EJS
app.set("view engine", "ejs");

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/collegeDB")
// mongoose.connect("mongodb+srv://krsauvi_72:saurav123@mycluster1.rqebw6q.mongodb.net/?appName=MyCluster1")
    .then(() => console.log("DB Connected"))
    .catch(err => console.log(err));

// Schema
const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String
});

// Model (IMPORTANT: collection name = student)
const Student = mongoose.model(
    "Student",
    studentSchema,
    "student"
);

// Home Route
app.get("/", async (req, res) => {
    try {
        const allstudent = await Student.find();

        const filteredStudents = allstudent.filter(student => student.age > 20);

        res.render("students", {
            allstudent: filteredStudents
        });

    } catch (err) {
        console.log(err);
        res.status(500).send("Error");
    }
});

// Form Page
app.get("/insertdata", (req, res) => {
    res.render("form");
});


app.get("/test",async(req,res)=>{
    let data = await Student.updateMany({name:"anshu"},{name:"ankita"})
    console.log(data);
    res.send("bye resting route")
})
// Save Data
app.post("/createdata", async (req, res) => {
    try {
        console.log("Received:", req.body);

        const data = await Student.create({
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        });

        console.log("Saved:", data);

        res.redirect("/");

    } catch (err) {
        console.log(err);
        res.status(500).send("Error Saving Data");
    }
});

// Server
app.listen(port, () => {
    console.log(`Server is working on ${port}`);
});