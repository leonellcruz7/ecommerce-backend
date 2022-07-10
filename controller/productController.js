const Product = require(`../models/Product`)
const auth = require(`../auth`)

module.exports = {

    addProduct: (req, res) => {

        const newProduct = new Product({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            image: req.body.image,
            availableStock: req.body.availableStock
        })

        newProduct.save().then((succ, err) => {
            if (err) {
                res.send(err)
            }
            else {
                res.send(succ)

            }
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

    getByCategory: async (req, res) => {
        await Product.find().then(result => {
            let found = []
            for (let i = 0; i < result.length; i++) {
                if (result[i].category.includes(req.body.find)) {
                    found += result[i]
                }
                else {

                }
            }
            res.send(found)
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
    }


}