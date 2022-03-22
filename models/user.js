const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    otp: [{
        otpno: {
            type: Number
        },
        expirydate: {
            type: Date
        }
    }],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

const User = new mongoose.model("User", userSchema);

exports = module.exports = User;