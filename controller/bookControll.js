const book= require('../model/cab').Booking;
const driver= require('../model/cab').Driver;
const parser=require('body-parser');

module.exports.getBook=(req,res)=>{
    
    res.render('booking')
}
module.exports.postBook= async (req,res)=>{
    console.log("line 8 of booking",req.body);
    const {pickup,destination,type,phone,time}=req.body;
    const bookedUser=req.session.userId
    req.session.source=pickup;
    req.session.destination=destination;
    await book.create({
        pickup:pickup,
        destination:destination,
        ridetype:type,
        phone:phone,
        time:time,
        passengerDetailId:bookedUser,
        driverid:req.params.id

    })
    await res.redirect("/fare");

}
module.exports.confirmation=(req,res)=>{
    res.render('confirmation');
}
module.exports.cancellBooking=async (req,res)=>{
    let bookedId=await book.findOne({
        where:{passengerDetailId:req.session.userId}
    })
    console.log(bookedId)
    console.log("line27",bookedId.dataValues.id);
    book.destroy({
        where:{id:bookedId.dataValues.id}
    })

}
module.exports.outStation=async (req,res)=>{
    let data=await driver.findAll(); 
    
    res.render("outstationdetails",{data:data});
}
