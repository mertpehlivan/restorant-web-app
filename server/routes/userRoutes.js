const { getuser } = require('../controllers/userController');

const router = require('express').Router()


router.get('/getuser',getuser)

module.exports = router;