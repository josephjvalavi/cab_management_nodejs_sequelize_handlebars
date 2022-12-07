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
    res.render('admindriverview',{data:data});
}
module.exports.allBooking=async(req,res)=>{
    let data=await book.findAll()
    console.log(data);
    res.render('adminbookview',{data:data});
}
module.exports.adminUserUpdateGet=async(req,res)=>{
    userid=req.params.id;
    req.session.userid=userid;
    console.log("line26admin",userid,req.session.userid);
    let data=await passenger.findByPk(userid);
    res.render('adminuserupdate',{data:data})
    

}
module.exports.adminUserUpdatePost=async(req,res)=>{
    
    const { firstname,lastname,adress,email, password,phone } = req.body;
    await passenger.update({
        firstName:firstname,
        lastName:lastname,
        email:email,
        phone:phone,
        adress:adress,
        password:password},
    
       { where:{
            id:req.session.userid}
        })
    
    res.redirect("/admin");
}
module.exports.adminUserDelete=async(req,res)=>{
    await passenger.destroy({
        where:{id:req.params.id}
    })
    
}
module.exports.adminDriverUpdateGet=async (req,res)=>{
    let driverid=req.params.id;
    req.session.driverid=driverid;
    let data=await driver.findByPk(driverid);
    res.render("adminupdatedriver",{data:data});
}

module.exports.adminDriverUpdatePost=async(req,res)=>{
    const { name,lastname,adress,email, password,phone,vehnum,carmodel } = req.body;
    await driver.update({
        name:name,
        //lastName:lastname,
        email:email,
        phone:phone,
        adress:adress,
        password:password,
        carType:carmodel,
        carNumber:vehnum
    },
    
       { where:{
            id:req.session.driverid}
        })
    
        await  res.render('adminupdatedriver',{message:"driver Updated Sucssefully"});
}
module.exports.adminDriverDelete= async(req,res)=>{
    await driver.destroy({
        where:{id:req.params.id}
    })
}
module.exports.adminCancelRide=async (req,res)=>{
await book.destroy({
    where:{id:req.params.id}
})
}