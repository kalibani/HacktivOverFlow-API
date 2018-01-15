const express = require('express')
const router = express.Router()
const user = require('../controllers/userCtrl')
const auth = require('../middlewares/Authentication')

router.post('/login', user.login)
router.post('/register', user.register)
router.post('/profile', auth.authorization, user.getProfile)

module.exports = router
