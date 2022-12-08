const parser=require('body-parser');
const driver=require('../model/cab').Driver;
const { where } = require('sequelize');
module.exports.getDriver=(req,res,next)=>{
    res.render('signupdriver');
}

module.exports.postDriver= async (req,res,next)=>{
    console.log(req.body)
    
    const { name,lastname,adress,email, password,phone,vehnum,carmodel } = req.body;
    let existingDriver = await driver.findOne({
        where: {
            email: email
        }
    });

    if(existingDriver){
        return res.render('signupdriver', {data: 'Already registered.'});
    }

    await driver.create({
        name: name,
        //lastName: lastname,
        email: email,
        phone:phone,
        password: password,
        adress:adress,
        carNumber:vehnum,
        carType:carmodel
    });

    await res.redirect('/driverlogin');
}

module.exports.getLoginDriver=(req,res,next)=>{
    res.render('logindriver');
}

module.exports.postLoginDriver=async (req,res,next)=>{
    const {email,password}=req.body;
    console.log("42hlo");
    console.log(email)
    console.log(password)
    
  let loggedDriver= await driver.findOne({
        where:{
            email:email,
            password:password
        }
    })
    console.log(loggedDriver)
    if(loggedDriver){
        req.session.driverId=loggedDriver.id;
        console.log("line54drivert",req.session.driverId);
       return res.redirect('/driverprofile');
    }
    res.render('logindriver',{message:"incorrect password or email"})


}
module.exports.driverProfile=async (req,res,next)=>{
    let driverDetails=await driver.findByPk(req.session.driverId);
    res.render("driverprofile",{data:driverDetails});
}
module.exports.updateDriverGet= async (req,res)=>{
    driverToUpdate=await driver.findByPk(req.session.driverId);
    console.log("line66",driverToUpdate);



    await res.render('updatedriver',{data:driverToUpdate});
}

module.exports.updateDriverPost= async (req,res)=>{
    console.log("line75",req.body);
   //
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
            id:req.session.driverId}
        })
    
        await  res.render('updatedriver',{message:"driver Updated Sucssefully"});
        await res.redirect('/driverprofile');
    }
        module.exports.deleteDriver= async (req,res)=>{
            await driver.destroy({
                where:{id:req.session.driverId}
            })
            await res.redirect('/login');
        }


    

