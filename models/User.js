const mongoose = require(`mongoose`)

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        requried: true
    },
    password: {
        type: String,
        required: true
    },

    isAdmin: {
        type: Boolean,
        default: false
    },
    dateRegistered: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model(`Users`, userSchema)