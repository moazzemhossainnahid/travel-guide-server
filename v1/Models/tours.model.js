const mongoose = require("mongoose");

const tourSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    departureDate: {
        type: Date,
        required: true
    },
    returnDate: {
        type: Date,
        required: true
    },
    highlights: {
        type: [String],
        required: true
    },
    included: {
        type: [String],
        required: true
    },
    notIncluded: {
        type: [String],
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
