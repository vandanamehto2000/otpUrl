const mongoose = require("mongoose");

const otpUrlSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    otp: {
        type: String
    },
})

module.exports = mongoose.model("OTPURL", otpUrlSchema);
