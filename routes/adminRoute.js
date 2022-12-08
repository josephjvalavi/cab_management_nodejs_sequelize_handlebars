const express= require('express');
const controller =require('../controller/adminControll');

route=express.Router()
route.get("/admin",controller.getadmin);
route.get("/adminuserview",controller.allUsers);
route.get("/admindriverview",controller.allDriver);
route.get("/adminbookview",controller.allBooking);
route.get("/adminupdateuser/:id",controller.adminUserUpdateGet);
route.post("/adminupdateuser/:id",controller.adminUserUpdatePost);
route.get("/adminupdatedriver/:id",controller.adminDriverUpdateGet);
route.post("/adminupdatedriver/:id",controller.adminDriverUpdatePost);
route.get("/admindeleteuser/:id",controller.adminUserDelete);
route.get("/admindeletedriver/:id",controller.adminDriverDelete);
route.get("/admincancelride/:id",controller.adminCancelRide);
route.post("/admin",controller.searchDate);

module.exports=route;