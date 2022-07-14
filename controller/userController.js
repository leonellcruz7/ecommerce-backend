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
            password: bcrypt.hashSync(req.body.password, 10),
            isAdmin: req.body.isAdmin
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

    getByEmail: (req, res) => {
        User.find({ email: req.body.email }).then(result => {
            res.send(result)
        })
    }






}