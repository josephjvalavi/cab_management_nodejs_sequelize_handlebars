const express= require('express');
const controller =require('../controller/bookControll');

route=express.Router()
route.get('/bookcab',controller.getBook);
route.post('/bookcab',controller.postBook);
route.get('/cancel',controller.cancellBooking);

module.exports=route;