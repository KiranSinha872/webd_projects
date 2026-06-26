// app
//  │
//  ├── student routes
//  ├── faculty routes
//  ├── admin routes
//  └── login routes
const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentController.js");
// console.log(studentController);


router.get("/", studentController.home);

router.get("/getdata", studentController.getStudents);

router.get("/insertdata", studentController.insertPage);

router.post("/createdata", studentController.createStudent);

router.get("/edit/:userid", studentController.editPage);

router.post("/update/:userid", studentController.updateStudent);

router.get("/delete/:id", studentController.deleteStudent);



module.exports = router;