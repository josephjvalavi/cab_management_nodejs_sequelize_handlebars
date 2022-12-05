const {Passenger,Booking,Driver}= require('./cab')



Passenger.sync({alter:true})
Driver.sync({alter:true})
Booking.sync({alter:true})

