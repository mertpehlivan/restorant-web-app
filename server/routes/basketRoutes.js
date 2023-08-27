const { findOrCreateBasket, addProductBasket, listBasket,removeProductFromBasket } = require('../controllers/basketController');

const router = require('express').Router();

router.get('/findOrCreateBasket', findOrCreateBasket);
router.post('/addProductBasket', addProductBasket);
router.get('/listBasket', listBasket); // Doğru rotayı burada tanımlayın
router.delete('/removeProductFromBasket/:productId', removeProductFromBasket);
module.exports = router;
