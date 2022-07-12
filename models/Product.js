const mongoose = require(`mongoose`)

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    availableStock: {
        type: Number,
        required: true
    },

    kind: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    isActive: {
        type: Boolean,
        default: true
    },

    review: {
        type: Array,
        default: null
    },

    createdOn: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model(`Products`, productSchema)