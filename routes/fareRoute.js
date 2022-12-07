const express=require('express');
const controller=require("../controller/fareControll")

const route=express.Router();

route.get("/fare",controller.payment);
module.exports=route;