const passenger = require('../model/cab').Passenger;
const driver = require('../model/cab').Driver;

module.exports = async (req, res, next) => {
    req.identity = {
        isAuthenticated: false,
        user: null
    }

    if( req.url == "/" || req.url == "/login" || req.url == "/signup"||req.url=="/driversignup"){
        return next();
    }
    let userId = req.session.userId;

    console.log("15hlo");
    if(!userId || userId == null){
        return res.redirect("/login");
    }

    let userFromDb = await passenger.findByPk(userId);
    if(userFromDb == null){
        return res.redirect("/login");
    }


    
    req.identity.isAuthenticated = true;
    req.identity.user = {
        id: userFromDb.dataValues.id,
        firstName: userFromDb.dataValues.firstName,
        lastName: userFromDb.dataValues.lastName,
        email: userFromDb.dataValues.email,
        phone: userFromDb.dataValues.phone,
        adress: userFromDb.dataValues.adress,
        role: 'user'
       
    }

    next();
}