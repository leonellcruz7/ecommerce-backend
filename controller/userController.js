const User = require(`../models/User`)
const Product = require(`../models/Product`)
const bcrypt = require(`bcrypt`)
const auth = require(`../auth`)
const { updateOne } = require("../models/User")

module.exports = {

    register: (req, res) => {
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            mobileNumber: req.body.mobileNumber,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        })

        newUser.save().then((succ, err) => {
            if (err) {
                res.send(err)
            }
            else {
                res.send(succ)
            }
        })
    },

    getUsers: (req, res) => {
        User.find().then(result => {
            res.send(result)
        })
    },

    login: (req, res) => {

        User.findOne({ email: req.body.email }).then(result => {
            if (result == null) {
                res.send(false)
            }
            else {
                const passMatch = bcrypt.compareSync(req.body.password, result.password)
                if (passMatch == true) {
                    res.send({ access: auth.createAccessToken(result) })
                }
                else {
                    res.send(false)
                }
            }
        })

    },

    detail: (req, res) => {
        const user = auth.decode(req.headers.authorization)

        User.findById(user.id).then(result => {
            res.send(result)
        })
    },

    // addToCart: async (req, res) => {
    //     const user = auth.decode(req.headers.authorization)

    //     try {
    //         const prodStat = await Product.findById(req.body.id).then(result => {
    //             return result.updateOne({
    //                 $set: {
    //                     availableStock: result.availableStock - req.body.amount
    //                 }
    //             }).then((succ, err) => {
    //                 if (err) {
    //                     return false
    //                 }
    //                 else {
    //                     return result
    //                 }
    //             })
    //         })

    //         const userStat = await User.findById(user.id).then(result => {
    //             result.orders.push({
    //                 productId: req.body.id,
    //                 productName: prodStat.name,
    //                 price: prodStat.price,
    //                 amount: req.body.amount,
    //                 totalBalance: prodStat.price * req.body.amount
    //             })
    //             return result.save().then((succ, err) => {
    //                 if (err) {
    //                     return false
    //                 }
    //                 else {
    //                     return true
    //                 }
    //             })
    //         })

    //         res.send(userStat)

    //     }
    //     catch {
    //         res.send(`cat`)
    //     }



    // },

    // deleteOrder: async (req, res) => {
    //     try {


    //     }
    //     catch {
    //         res.send(`sdf`)
    //     }

    // }


}