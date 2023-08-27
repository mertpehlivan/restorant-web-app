const connection = require('../config/db');

class OrderRepository {
   
    async insertOrder(basketId, totalPrice) {
        const insertOrderQuery = 'INSERT INTO orders (basket_id, basket_total_price, order_time) VALUES (?, ?, NOW())';
        return new Promise((resolve, reject) => {
            connection.query(insertOrderQuery, [basketId, totalPrice], (insertErr, insertResult) => {
                if (insertErr) {
                    reject(insertErr);
                } else {
                    resolve(insertResult);
                }
            });
        });
    }
    
}

module.exports = new OrderRepository();
