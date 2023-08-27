const connection = require('../config/db');
const UserRepository = require('./UserRepository');

class BasketRepository {
    static findOrCreateBasket(email) {
        return new Promise((resolve, reject) => {
            const selectQuery = 'SELECT b.basket_id FROM users AS u INNER JOIN baskets AS b ON u.user_id = b.user_id WHERE u.user_email = ? AND b.basket_status = 0';
            connection.query(selectQuery, [email], (err, result) => {
                if (err) {
                    reject(err);
                } else if (result.length === 0) {
                    UserRepository.findUserByEmail(email)
                        .then(userResult => {
                            const insertQuery = 'INSERT INTO baskets(user_id, basket_status) VALUES (?, ?)';
                            connection.query(insertQuery, [userResult[0].user_id, 0], (insertErr, insertResult) => {
                                if (insertErr) {
                                    reject(insertErr);
                                } else {
                                    resolve(insertResult);
                                }
                            });
                        })
                        .catch(userErr => {
                            reject(userErr);
                        });
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async addProductBasket(email, productId) {
        try {
            const result = await this.findOrCreateBasket(email);
            console.log(result)
            const selectInsertQuery = 'INSERT INTO product_basket(basket_id, product_id) VALUES (?, ?)';
            const insertResult = await new Promise((resolve, reject) => {
                connection.query(selectInsertQuery, [result[0].basket_id, productId], (insertErr, insertResult) => {
                    if (insertErr) {
                        reject(insertErr);
                    } else {
                        resolve(insertResult);
                    }
                });
            });
            return insertResult;
        } catch (error) {
            throw error;
        }
    }
    static getBasketProducts(basketId){
        console.log(basketId);
        return new Promise((resolve, reject) => {
            const query = `
                SELECT
                    product_id
                FROM
                    product_basket
                WHERE
                    basket_id = ?;
            `;
            connection.query(query, [basketId], (error, results) => {
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    console.log(results);
                    resolve(results);
                }
            });
        });
    };
    static listBasketItems(basketId) {
        return new Promise((resolve, reject) => {
            const selectQuery = 'SELECT p.product_id, p.product_name, p.product_price, pb.basket_id FROM product_basket AS pb INNER JOIN products AS p ON pb.product_id = p.product_id WHERE pb.basket_id = ?';
            connection.query(selectQuery, [basketId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
    static updateBasketStatus(basketId){
        console.log(basketId)
        const updateQuery = 'UPDATE baskets SET basket_status = 1 WHERE basket_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(updateQuery, [basketId], (updateErr, updateResult) => {
                if (updateErr) {
                    reject(updateErr);
                } else {
                    resolve(updateResult);
                }
            });
        });
    };
    
    static getUserPastBasket(userId) {
        return new Promise((resolve, reject) => {
            const selectQuery = 'SELECT basket_id FROM baskets WHERE user_id = ? AND basket_status=1';
            connection.query(selectQuery, [userId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
    static removeProductFromBasket(basketId, productId) {
        console.log(basketId,productId)
        return new Promise((resolve, reject) => {
            const deleteQuery = 'DELETE FROM product_basket WHERE basket_id = ? AND product_id = ?';
            connection.query(deleteQuery, [basketId, productId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = BasketRepository;
