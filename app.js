const userRoute= require('./routes/userRoute');
const bookRoute= require('./routes/bookRoute');
const driverRoute= require('./routes/driverRoute');
const adminRoute= require('./routes/adminRoute');
const express=require('express');
const parser = require('body-parser');
const {engine} = require('express-handlebars');
const cookieSession = require('cookie-session');
const authMiddleware = require('./middleware/middleWare');
const authMiddlewareDriver = require('./middleware/drivermiddleWare');

const path = require('path');
app=express();
app.use("/static", express.static(path.join(__dirname, 'static')));
app.use('/', parser.urlencoded({extended: true}));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.use(cookieSession({
    name: 'session',
    httpOnly: true,
    keys: ["asdghjhgsdahjsgdhjasd"],
    maxAge: 24 * 60 * 60 * 1000
}));
app.use(authMiddleware);
app.use(authMiddlewareDriver);
app.use(userRoute);
app.use(driverRoute);
app.use(adminRoute);
app.use(bookRoute);



app.listen(80);