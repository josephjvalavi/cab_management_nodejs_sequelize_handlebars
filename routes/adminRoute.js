const express= require('express');
const controller =require('../controller/adminControll');

route=express.Router()
route.get("/admin",controller.getadmin);
route.get("/adminuserview",controller.allUsers);
route.get("/admindriverview",controller.allDriver);
route.get("/adminbookview",controller.allBooking);

module.exports=route;