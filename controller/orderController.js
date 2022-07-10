const Product = require(`../models/Product`)
const User = require(`../models/User`)
const Order = require(`../models/Order`)
const auth = require(`../auth`)

module.exports = {

    getAllOrder: (req, res) => {
        Order.find().then(result => {
            res.send(result)
        })
    },

    addToCart: async (req, res) => {
        const user = auth.decode(req.headers.authorization)

        const product = await Product.findById(req.body.productId).then(result => {
            return result

        })


        let newOrder = new Order({
            account: user.email,
            accountId: user.id,
            productName: product.name,
            productId: product._id,
            productPrice: product.price,
            productImage: product.image,
            quantity: req.body.amount,
            totalBalance: product.price * req.body.amount
        })
        newOrder.save()

        Product.findByIdAndUpdate({ _id: req.body.productId }, {
            $set: {
                availableStock: product.availableStock - req.body.amount
            }
        }).then(result => {
            res.send(true)
        })
    },

    getMyOrder: (req, res) => {

        const user = auth.decode(req.headers.authorization)
        Order.find({ accountId: user.id }).then(result => {
            res.send(result)
        })
    },

    deleteOrder: async (req, res) => {
        try {
            let order = await Order.findById(req.body.id).then(result => {


                return result
            })

            await Product.findById({ _id: order.productId }).then(result => {
                result.updateOne({
                    set$: {
                        availableStock: result.availableStock + order.quantity
                    }
                })
            }).then(result => { res.send(order) })
        }
        catch {
            res.send(`catt`)
        }





    }

}