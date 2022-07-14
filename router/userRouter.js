const express = require(`express`)
const router = express.Router()
const userController = require(`../controller/userController`)
const auth = require(`../auth`)

router.post(`/register`, userController.register)

router.get(`/`, userController.getUsers)

router.post(`/login`, userController.login)

router.get('/details', auth.verify, userController.detail)

router.post('/getbyemail', userController.getByEmail)


module.exports = router;