const book= require('../model/cab').Booking;
const parser=require('body-parser');

module.exports.getBook=(req,res)=>{
    res.render('booking')
}
module.exports.postBook= async (req,res)=>{
    console.log("line 8 of booking",req.body);
    const {pickup,destination,type,phone,time}=req.body;
    const bookedUser=req.session.userId
    await book.create({
        pickup:pickup,
        destination:destination,
        ridetype:type,
        phone:phone,
        time:time,
        passengerDetailId:bookedUser

    })

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