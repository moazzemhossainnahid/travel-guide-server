const mongoose = require("mongoose");
const validator = require("validator");


const visaApplicationSchema = mongoose.Schema(
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
        country: {
            type: String,
            trim: true,
            required: [true, "country is required"],
        },
        nidNo: {
            type: String,
            trim: true,
            required: [true, "nidNo is required"],
        },
        passportNo: {
            type: String,
            trim: true,
            required: [true, "passportNo is required"],
        },
        dob: {
            type: String,
            trim: true,
            required: [true, "dob is required"],
        },
        visaDuration: {
            type: String,
            trim: true,
            required: [true, "visaDuration is required"],
        },
        maritalStatus: {
            type: String,
            trim: true,
            required: [true, "maritalStatus is required"],
        },
        nationality: {
            type: String,
            trim: true,
            required: [true, "nationality is required"],
        },
        visaPurpose: {
            type: String,
            trim: true,
            required: [true, "visaPurpose is required"],
        },

    },
    {
        timestamps: true,
    }

);


const visaApplication = mongoose.model("visaApplication", visaApplicationSchema);

module.exports = visaApplication;