const passenger=require('../model/cab').Passenger;
const parser=require('body-parser');
const { where } = require('sequelize');
module.exports.getHome=(req,res)=>{
    res.render('home');

}
module.exports.getPassenger=(req,res,next)=>{
    res.render('signup');
}

module.exports.postPassenger= async (req,res,next)=>{
    console.log(req.body)
    
    const { firstname,lastname,adress,email, password,phone } = req.body;
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
        adress:adress
    });

    await res.redirect('login');
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
    })
    if(loggedPassenger){
        req.session.userId=loggedPassenger.id;
        console.log("line54",req.session.userId);
       return res.redirect('profile');
    }
    res.render('login',{message:"incorrect password or email"})


}
module.exports.userProfile=(req,res,next)=>{
    res.render('profile');
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
            await res.redirect('/login');
        }


    

