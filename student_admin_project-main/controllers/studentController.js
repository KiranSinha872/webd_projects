// const Student = require("../models/Student");
// //Student model jo karna h karo

// exports.home = (req, res) => {
//     res.render("home");
// };

// exports.getStudents = async (req, res) => {
//     const allstudent = await Student.find();
//     res.render("students", { allstudent });
// };

// exports.insertPage = (req, res) => {
//     res.render("form");
// };

// exports.createStudent = async (req, res) => {
//     req.body.ip = req.ip;
//     await Student.create(req.body);
//     res.redirect("/getdata");
// };

// exports.editPage = async (req, res) => {
//     const data = await Student.findById(req.params.userid);
//     res.render("edit", { data });
// };

// exports.updateStudent = async (req, res) => {
//     await Student.findByIdAndUpdate(req.params.userid, req.body, {
//         new: true
//     });

//     res.redirect("/getdata");
// };

// exports.deleteStudent = async (req, res) => {
//     await Student.findByIdAndDelete(req.params.id);
//     res.redirect("/getdata");
// };



const Student = require("../models/Student.js");

const studentController = {

    home: (req, res) => {
        res.render("home");
    },

    getStudents: async (req, res) => {
        const allstudent = await Student.find();
        res.render("students", { allstudent });
    },

    insertPage: (req, res) => {
        res.render("form");
    },

    createStudent: async (req, res) => {
        req.body.ip = req.ip;
        await Student.create(req.body);
        res.redirect("/getdata");
    },

    editPage: async (req, res) => {
        const data = await Student.findById(req.params.userid);
        res.render("edit", { data });
    },

    updateStudent: async (req, res) => {
        await Student.findByIdAndUpdate(req.params.userid, req.body, {
            new: true
        });

        res.redirect("/getdata");
    },

    deleteStudent: async (req, res) => {
        await Student.findByIdAndDelete(req.params.id);
        res.redirect("/getdata");
    }

};

module.exports = studentController;
