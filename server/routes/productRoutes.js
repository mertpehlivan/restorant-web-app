const { getProduct } = require('../controllers/productController');

const router = require('express').Router()


router.get('/getproduct',getProduct)

module.exports = router;