const express= require('express');
const controller =require('../controller/bookControll');

route=express.Router()
route.get('/bookcab/:id',controller.getBook);
route.post('/bookcab/:id',controller.postBook);
route.get('/cancel',controller.cancellBooking);
route.get('/rideconfirmation',controller.confirmation);
route.get('/outstationdrivers',controller.outStation);

module.exports=route;