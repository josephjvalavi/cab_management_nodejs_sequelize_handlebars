const express= require('express');
const controller =require('../controller/passengerControll');

route=express.Router()
route.get('/',controller.getHome);
route.get('/signup',controller.getPassenger);
route.post('/signup',controller.postPassenger);
route.get('/login',controller.getLogin);
route.post('/login',controller.postLogin);
route.get('/profile',controller.userProfile);
route.get('/updateuser',controller.updateUserGet);
route.post('/updateuser',controller.updateUserPost);
route.get('/deleteuser',controller.deleteUser);
route.get('/logout',controller.logout);
route.get('/showbooking',controller.showUserBooking);

module.exports = route;
