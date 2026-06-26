const express = require("express");
const app = express();
const log=require("./middleware/log")
const gold=require("./middleware/gold")
const connectDB=require("./config/mongodb.js")
const route = require("./routes")
const
const port=3000;
connectDB();

app.use(express.json());

app.use(express.urlencoded({extended:true}));
app.use(log);

app.use("/gold",gold);















app.listen(3000,()=>{
    console.log(`server is running at ${port}`);
})