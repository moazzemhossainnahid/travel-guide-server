const mongoose = require("mongoose");


const roomSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    price: {
        type: String,
        required: true
    }
});

const hotelSchema = mongoose.Schema({
    hotel_name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rooms: {
        type: [roomSchema],
        required: true
    },
    additional_info: {
        check_in: {
            type: String,
            required: true
        },
        check_out: {
            type: String,
            required: true
        }
    },
    rating: {
        total_rating: {
            type: Number,
            required: true
        },
        total_people: {
            type: Number,
            required: true
        }
    },
    payment_accept: {
        type: [String],
        required: true
    }
});

const locationSchema = mongoose.Schema({
    location_name: {
        type: String,
        required: true
    },
    location_image: {
        type: String,
        required: true
    },
    hotels: {
        type: [hotelSchema],
        required: true
    }
});

const countrySchema = mongoose.Schema({
    country_name: {
        type: String,
        required: true
    },
    country_image: {
        type: String,
        required: true
    },
    locations: {
        type: [locationSchema],
        required: true
    }
});

const Countries = mongoose.model("Countries", countrySchema);

module.exports = Countries;
