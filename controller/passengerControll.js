const passenger=require('../model/cab').Passenger;
const driver=require('../model/cab').Driver;
const book=require('../model/cab').Booking;
const parser=require('body-parser');
const { where } = require('sequelize');

module.exports.getHome=(req,res)=>{
    res.render('home');

}
module.exports.logout=(req,res)=>{
    req.session=null;
    res.redirect("/login");
}
module.exports.getPassenger=(req,res,next)=>{
    var captcha = Math.floor(1000 + Math.random() * 9000);
    console.log(captcha);
    req.session.captcha=captcha;

    res.render('signup',{captcha:captcha});
}

module.exports.postPassenger= async (req,res,next)=>{
    console.log(req.body)
    const { firstname,lastname,adress,email, password,phone,captcha } = req.body;
    if(captcha==req.session.captcha){

    let existingUser = await passenger.findOne({
        where: {
            email: email
        }
    });

    if(existingUser){
        return res.render('signup', {data: 'Already registered.'});
    }

    await passenger.create({
        firstName: firstname,
        lastName: lastname,
        email: email,
        phone:phone,
        password: password,
        adress:adress,
        role:"passenger"
    });

    await res.redirect('login');
}
}

module.exports.getLogin=(req,res,next)=>{
    res.render('login');
}

module.exports.postLogin=async (req,res,next)=>{
    const {email,password}=req.body;
    console.log("hlo");
    console.log(email)
    console.log(password)
  let loggedPassenger= await passenger.findOne({
        where:{
            email:email,
            password:password
        }
    });
    if(loggedPassenger){
        req.session.userId=loggedPassenger.id;
        console.log("line64",req.session.userId);
       return res.redirect('/profile');
    }
     if(!loggedPassenger||loggedPassenger==null){
        let driverid= await driver.findOne({
            where:{email:email,
            password:password}
        })
        if(driverid){
        console.log("line76",driverid)
    req.session.driverId=driverid.id;

    req.session.role=2;
    console.log("line80",req.session.driverId)

        return res.render('driverprofile');
    }
}
    if(email=="admin@gmail.com" && password=="123456789" ){
        req.session.role=3;
        res.redirect("/admin")
    } 
    else{                                         
    res.render('login',{message:"incorrect password or email"})

}
}
module.exports.userProfile=async (req,res,next)=>{
    let userDetails=await passenger.findByPk(req.session.userId);
    console.log("line89passenger controll",userDetails);
    res.render('profile',{data:userDetails});

}
module.exports.updateUserGet= async (req,res)=>{
    userToUpdate=await passenger.findByPk(req.session.userId);
    console.log("line67",userToUpdate);



    await res.render('updateuser',{data:userToUpdate});
}

module.exports.updateUserPost= async (req,res)=>{
    console.log("line75",req.body);
   //
    const { firstname,lastname,adress,email, password,phone } = req.body;
    await passenger.update({
        firstName:firstname,
        lastName:lastname,
        email:email,
        phone:phone,
        adress:adress,
        password:password},
    
       { where:{
            id:req.session.userId}
        })
    
        await  res.render('updateuser',{message:"User Updated Sucssefully"});
        //await res.redirect('/profile');
    }
        module.exports.deleteUser= async (req,res)=>{
            await passenger.destroy({
                where:{id:req.session.userId}
            })
            await res.redirect('/profile');
        }


    module.exports.showUserBooking=async(req,res)=>{
        let data=await book.findAll({
            where:{passengerDetailId:req.session.userId}
        })
        res.render('usershowbook',{data:data})
    }

