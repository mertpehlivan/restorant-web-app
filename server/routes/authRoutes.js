
const {login,register} = require('../controllers/authController')

const router = require('express').Router()

//OTURUM İŞLEMLERİ

router.post('/login',login)
router.post('/register',register)
router.get('/verify-token',)

module.exports = router;