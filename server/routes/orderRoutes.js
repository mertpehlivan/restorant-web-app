const { placeOrder, getUserBasketsAndProducts } = require('../controllers/orderController');

const router = require('express').Router();

router.post('/placeOrder',placeOrder)
router.get('/pastOrder',getUserBasketsAndProducts)

module.exports = router;