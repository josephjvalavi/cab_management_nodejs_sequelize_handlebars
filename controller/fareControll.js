const fare= require('../model/cab').Fare;
const parser=require("body-parser");


module.exports.payment=async (req,res)=>{
    let source=req.session.source;
    let destination=req.session.destination;
    let price=await fare.findOne({
        where:{
            source:source,
            destination:destination
        }
    })

    console.log("price",price);
    req.session.price=price;

    res.render('invoice',{data:price})
}