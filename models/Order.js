const mongoose = require(`mongoose`)

const orderSchema = mongoose.Schema({
    account: {
        type: String,
        required: true
    },
    accountId: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    totalBalance: {
        type: Number,
        required: true
    },
    orderedOn: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model(`Orders`, orderSchema)