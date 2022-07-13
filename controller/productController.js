const Product = require(`../models/Product`)
const User = require(`../models/User`)
const auth = require(`../auth`)

module.exports = {

    addProduct: (req, res) => {
        const user = auth.decode(req.headers.authorization)

        User.findById(user.id).then(result => {
            const newProduct = new Product({
                name: req.body.name,
                description: req.body.description,
                category: req.body.category,
                kind: req.body.kind,
                brand: req.body.brand,
                price: req.body.price,
                image: req.body.image,
                availableStock: req.body.availableStock,
                sellerId: user.id,
                sellerName: `${result.firstName} ${result.lastName}`
            })

            newProduct.save().then((succ, err) => {
                if (err) {
                    res.send(err)
                }
                else {
                    res.send(succ)

                }
            })
        })



    },

    getAll: (req, res) => {
        Product.find().then(result => {
            res.send(result)
        })
    },

    getById: (req, res) => {
        Product.findById(req.body.id).then(result => {
            res.send(result)


        })
    },

    addStock: (req, res) => {
        Product.findById(req.body.id).then(result => {
            result.updateOne({
                $set: {
                    availableStock: result.availableStock + req.body.amount
                }
            }).then((succ, err) => {
                if (err) {
                    res.send(err)
                }
                else {
                    res.send(succ)
                }
            })
        })
    },

    getByKind: (req, res) => {
        Product.find({ kind: req.body.kind }).then(result => {
            res.send(result)
        })
    },

    getByCategory: (req, res) => {
        Product.find({ category: req.body.category }).then(result => {
            res.send(result)
        })
    },

    search: (req, res) => {
        Product.aggregate([
            {
                $match: {
                    $or: [
                        { kind: req.body.search },
                        { category: req.body.search },
                        { brand: req.body.search }

                    ]
                }
            }
        ]).then(result => { res.send(result) })
    },
    getListings: (req, res) => {
        const user = auth.decode(req.headers.authorization)

        Product.find({ sellerId: user.id }).then(result => {
            res.send(result)
        })
    }


}