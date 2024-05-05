const mongoose = require("mongoose");
const validator = require("validator");


const jobApplicationSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "name is required"],
        },
        phone: {
            type: String,
            trim: true,
            required: [true, "address is required"],
        },
        email: {
            type: String,
            trim: true,
            required: [true, "email is required"],
        },
        address: {
            type: String,
            required: [true, "address is required"],
            trim: true,
        },
        message: {
            type: String,
            required: [true, "message is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
        },
        jobTitle: {
            type: String,
            trim: true,
            unique: false,
            required: [true, "jobTitle is required"],
        },
        jobPosition: {
            type: String,
            required: [true, "jobPosition is required"],
        },
        jobEmail: {
            type: String,
            required: [true, "jobEmail is required"],
        },
        companyName: {
            type: String,
            trim: true,
            unique: false,
            required: [true, "companyName is required"],
        },
    },
    {
        timestamps: true,
    }

);


const JobApplication = mongoose.model("jobApplications", jobApplicationSchema);

module.exports = JobApplication;