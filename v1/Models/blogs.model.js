const mongoose = require("mongoose");
const validator = require("validator");


const blogsSchema = mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            unique: false,
            required: [true, "Title is required"],
        },
        category: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
        },
        banner: {
            required: true,
            type: String,
            validate: [validator.isURL, "Please provide Product Image URL"],
        },
        author: {
            type: String,
            required: [true, "Author is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
        },
        comments: [
            {
                photoURL: {
                    type: String,
                    required: false,
                },
                name: {
                    type: String,
                    required: false,
                },
                email: {
                    type: String,
                    required: false,
                },
                comment: {
                    type: String,
                    required: false,
                },
            }
        ]
    },
    {
        timestamps: true,
    }

);


const Blogs = mongoose.model("blogs", blogsSchema);

module.exports = Blogs;