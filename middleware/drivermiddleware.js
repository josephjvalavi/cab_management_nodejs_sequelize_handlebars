//const driver = require('../model/cab').Passenger;
const driver = require('../model/cab').Driver;

module.exports = async (req, res, next) => {
    req.driveridentity = {
        isAuthenticated: false,
        drive: null
    }

    if(req.url == "/driverlogin" || req.url == "/driversignup" ){
        return next();
    }

    let driverId = req.session.driverId;

    console.log("16hlo");
    if(!driverId || driverId == null){
        return res.redirect("/driverlogin");
    }

    let driverFromDb = await driver.findByPk(driverId);
    if(driverFromDb == null){
        return res.redirect("/driverlogin");
    }


    
    req.identity.isAuthenticated = true;
    req.identity.user = {
        id: driverFromDb.dataValues.id,
        firstName: driverFromDb.dataValues.firstName,
        lastName: driverFromDb.dataValues.lastName,
        email: driverFromDb.dataValues.email,
        phone: driverFromDb.dataValues.phone,
        adress: driverFromDb.dataValues.adress,
        role: 'driver'
    }
    next();
}