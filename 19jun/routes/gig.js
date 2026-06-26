const express = require ("express");
const route=express.Router();
route.get("/",gigController.ordertrack);
route.get("/assignOrder",gigController.assignorder);