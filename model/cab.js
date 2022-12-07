const db= require('./db')
const {DataTypes}= require('sequelize')

const Passenger= db.sequelize.define("passengerDetails",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,

    },
    firstName:{
        type:DataTypes.STRING,
        allowNull:false

    },
    lastName:{

        type:DataTypes.STRING,
        allowNull:false


    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true

    },
    phone:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true

    },
    adress:{
        type:DataTypes.STRING,
        allowNull:false
        

    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }

    })

    //table booking
    const Booking= db.sequelize.define("bookingDetails",{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
    
        },
        
        pickup:{
            type:DataTypes.STRING,
            allowNull:false,
            
    
        },
        destination:{
            type:DataTypes.STRING,
            allowNull:false
            
    
        },
        ridetype:{
            type:DataTypes.STRING,
            allowNull:false
        },
        
        time:{
            type:DataTypes.STRING,
            allowNull:false
        },
        phone:{
            type:DataTypes.STRING,
            allowNull:false
        },
        driverid:{
            type:DataTypes.STRING,
            allowNull:true
        }

    
    
        })

        //table driving

        const Driver= db.sequelize.define("driverDetails",{
            id:{
                type:DataTypes.INTEGER,
                autoIncrement:true,
                primaryKey:true,
        
            },
            
            name:{
                type:DataTypes.STRING,
                allowNull:false,
                
        
            },
            email:{
                type:DataTypes.STRING,
                allowNull:false,
                unique:true
                
        
            },
            phone:{
                type:DataTypes.STRING,
                allowNull:false
            },
            
            adress:{
                type:DataTypes.STRING,
                allowNull:false
            },
            carNumber:{
                type:DataTypes.STRING,
                allowNull:false
            },
            carType:{
                type:DataTypes.STRING,
                allowNull:false
            },
            password:{
                type:DataTypes.STRING,
                allowNull:false
            }
        
        
        
            })

            const Fare=db.sequelize.define("fareDetails",{

                id:{
                    type:DataTypes.INTEGER,
                    autoIncrement:true,
                    primaryKey:true,
            
                },
                
                source:{
                    type:DataTypes.STRING,
                    allowNull:false,
                    
            
                },
                destination:{
                    type:DataTypes.STRING,
                    allowNull:false,
                    unique:false
                    
            
                },
                fare:{
                    type:DataTypes.INTEGER,
                    allowNull:false
                }
                
            },{ timestamps: false })

            Passenger.hasMany(Booking)
            Booking.belongsTo(Passenger)
            module.exports.Driver =Driver;
            module.exports.Booking =Booking;
            module.exports.Passenger =Passenger;
            module.exports.Fare =Fare;
        