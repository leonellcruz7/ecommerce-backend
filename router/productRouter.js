const express = require(`express`)
const router = express.Router()
const productController = require(`../controller/productController`)
const auth = require(`../auth`)

router.post(`/addProduct`, productController.addProduct)

router.get(`/all`, productController.getAll)

router.post(`/getbyid`, productController.getById)

router.post('/getbycategory', productController.getByCategory)

router.post('/addstock', productController.addStock)

module.exports = router;