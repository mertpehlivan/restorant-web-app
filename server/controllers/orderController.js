const OrderRepository = require('../repositories/OrderRepository');
const BasketRepository = require('../repositories/BasketRepository');
const UserRepository = require('../repositories/UserRepository');
const ProductRepository = require('../repositories/ProductRepository');
class OrderController {
    async placeOrder(req, res) {
        const { basket_id, total_price } = req.body;
        console.log(basket_id)
        try {
            await BasketRepository.updateBasketStatus(basket_id);
            await OrderRepository.insertOrder(basket_id, total_price);

            res.status(200).json({ message: 'Order placed successfully.' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'An error occurred while placing the order.' });
        }
    }
    async getUserBasketsAndProducts (req, res) {
        const userEmail = req.email; // E-posta adresini authMiddleware ile alın
    
        try {
            const basketProducts = [];
            // Kullanıcının user_id değerini al
            const userId =await UserRepository.getUserIdByEmail(userEmail)
            console.log('userid',userId);
            const basketsId = await BasketRepository.getUserPastBasket(userId)
            for (const basketId of basketsId) {
                
                const products = await BasketRepository.getBasketProducts(basketId.basket_id);
                
                const productDetails = await Promise.all(products.map(async product => {
                    const productDetails = await ProductRepository.getIdProduct(product.product_id);
                    console.log("product details",productDetails)
                    for (const productdetail of productDetails){
                        return {
                            product_name: productdetail.product_name,
                            product_price: productdetail.product_price
                        };
                    }
                    
                }));
                
                basketProducts.push({ basketId, products: productDetails });
                
            }
            return res.send(basketProducts);         
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred.',error });
        }
    };
}

module.exports = new OrderController();
