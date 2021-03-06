const express = require(`express`)
const router = express.Router()
const orderController = require(`../controller/orderController`)
const auth = require(`../auth`)

router.get('/', orderController.getAllOrder)

router.post('/addtocart', auth.verify, orderController.addToCart)


router.get('/getmyorder', auth.verify, orderController.getMyOrder)

router.delete('/deleteorder', orderController.deleteOrder)

router.patch('/checkout', auth.verify, orderController.checkOut)

router.get('/orderhistory', auth.verify, orderController.orderHistory)



module.exports = router;