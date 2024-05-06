const mongoose = require("mongoose");
const validator = require("validator");


const tourBookingSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "name is required"],
        },
        tourPlan: {
            type: String,
            trim: true,
            required: [true, "tourPlan is required"],
        },
        phone: {
            type: String,
            trim: true,
            required: [true, "address is required"],
        },
        address: {
            type: String,
            trim: true,
            required: [true, "address is required"],
        },
        adult: {
            type: Number,
        },
        children: {
            type: Number,
        }
    },
    {
        timestamps: true,
    }

);


const tourBooking = mongoose.model("tourBooking", tourBookingSchema);

module.exports = tourBooking;