const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const colors = require("colors");
const mongoose = require('mongoose');

require('dotenv').config();



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// import routes
const usersRoute = require('./v1/Routes/users.route');
const countriesRoute = require('./v1/Routes/country.route');
const toursRoute = require('./v1/Routes/tours.route');
const tourBookingRoute = require('./v1/Routes/tourBooking.route');
const flightBookingRoute = require('./v1/Routes/flightBooking.route');
const visaApplicationRoute = require('./v1/Routes/visaApplication.route');
const sslsRoute = require('./v1/Routes/ssl.route');
const ordersRoute = require('./v1/Routes/orders.route');






// declare routes
app.use('/api/v1/users', usersRoute);
app.use('/api/v1/countries', countriesRoute);
app.use('/api/v1/tours', toursRoute);
app.use('/api/v1/tour-booking', tourBookingRoute);
app.use('/api/v1/flight-booking', flightBookingRoute);
app.use('/api/v1/visa-application', visaApplicationRoute);
app.use('/api/v1/ssl', sslsRoute);
app.use('/api/v1/orders', ordersRoute);





app.get("/", (req, res) => {
    try {
        res.send("Welcome to Travel Guide Server !");
    } catch (error) {
        console.log(error.message);
    };
});

app.all("*", (req, res) => {
    try {
        res.send("No Routes Found");
    } catch (error) {
        console.log(error.message);
    };
});


app.listen(PORT, () => {
    try {
        console.log(`server is successfully running on port ${PORT}!`.red.bold);
    } catch (error) {
        console.log(error.message);
    };
});

exports = app;