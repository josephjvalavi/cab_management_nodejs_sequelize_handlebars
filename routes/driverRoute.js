const express= require('express');
const controller =require('../controller/driverControll');

route=express.Router()

route.get('/driversignup',controller.getDriver);
route.post('/driversignup',controller.postDriver);
route.get('/driverlogin',controller.getLoginDriver);
route.post('/driverlogin',controller.postLoginDriver);
route.get('/driverprofile',controller.driverProfile);
route.get('/driverupdate',controller.updateDriverGet);
route.post('/driverupdate',controller.updateDriverPost);
route.post('/driverdelete',controller.deleteDriver);

module.exports=route;
