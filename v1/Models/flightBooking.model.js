const mongoose = require("mongoose");
const validator = require("validator");


const flightBookingSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "name is required"],
        },
        email: {
            type: String,
            trim: true,
            required: [true, "email is required"],
        },
        phone: {
            type: String,
            trim: true,
            required: [true, "phone is required"],
        },
        address: {
            type: String,
            trim: true,
            required: [true, "address is required"],
        },
        fromAirport: {
            type: String,
            trim: true,
            required: [true, "fromAirport is required"],
        },
        toAirport: {
            type: String,
            trim: true,
            required: [true, "toAirport is required"],
        },
        travelerClass: {
            type: String,
            trim: true,
            required: [true, "travelerClass is required"],
        },
        journeyDate: {
            type: String,
            trim: true,
            required: [true, "journeyDate is required"],
        },
        numTravelers: {
            type: Number,
            trim: true,
            required: [true, "numTravelers is required"],
        },

    },
    {
        timestamps: true,
    }

);


const flightBooking = mongoose.model("flightBooking", flightBookingSchema);

module.exports = flightBooking;