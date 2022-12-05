const parser=require('body-parser');
const driver=require('../model/cab').Driver;
const passenger=require('../model/cab').Passenger;
const book=require('../model/cab').Booking;
const { where } = require('sequelize');

module.exports.getadmin=(req,res)=>{
    res.render('admin');
}
module.exports.allUsers=async(req,res)=>{
    let data=await passenger.findAll()
    res.render('adminuserview',{data:data});
}

module.exports.allDriver=async(req,res)=>{
    let data=await driver.findAll()
    res.render('adminuserview',{data:data});
}
module.exports.allBooking=async(req,res)=>{
    let data=await book.findAll()
    res.render('adminuserview',{data:data});
}