const {Passenger,Booking,Driver,Fare}= require('./cab')



 Passenger.sync({alter:true})
// Driver.sync({alter:true})
 Booking.sync({force:true})
// Fare.sync({force:true})

