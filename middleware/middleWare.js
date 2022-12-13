const passenger = require('../model/cab').Passenger;
const driver = require('../model/cab').Driver;

module.exports = async (req, res, next) => {
    req.identity = {
        isAuthenticated: false,
        user: null
    }

    if( req.url == "/" || req.url == "/login" || req.url == "/signup"||req.url=="/driversignup"||req.url=="/driverupdate"||req.url=="/driverdelete"||req.url=="/admin"||req.url=="/adminuserview"||req.url=="/admindriverview"||req.url=="/adminbookview"||req.url=="/adminupdatedriver"||req.url=="/deletedriver"||req.url=="/showuserbooking"||req.url=="drivershowbookings"){
        return next();
    }
    let userId = req.session.userId;
    let driverId = req.session.driverId;

    console.log("15hlo");
    if(!userId || userId == null){
        return res.redirect("/login");
    }

    let userFromDb = await passenger.findByPk(userId);
    let driverfromDb=await driver.findByPk(driverId);
    if(userFromDb == null && driverfromDb==null ){
        return res.redirect("/login");
    }


    
    req.identity.isAuthenticated = true;
    req.identity.user = {
        //id: userFromDb.dataValues.id,
        firstName: userFromDb.dataValues.firstName,
        lastName: userFromDb.dataValues.lastName,
        email: userFromDb.dataValues.email,
        phone: userFromDb.dataValues.phone,
        adress: userFromDb.dataValues.adress,
        role: 'user'
       
    }
    if(req.session.role==2){
        if(req.url=='/'||req.url=="/driverupdate"||req.url=="/driverdelete"){
            return next();
        }
    }
    if(req.session.role==3){
        if(req.url=="/admin"){
            return next();
        }
    }

    next();
}