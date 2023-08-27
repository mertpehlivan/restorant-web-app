const connection = require('../config/db');


class ProductRepository {
    
    static getProduct() {
        return new Promise((resolve, reject) => {
            const selectQuery = 'SELECT * FROM products';
            connection.query(selectQuery, (err, result) => {
                if(err){
                    reject(err)
                }
                resolve(result)
            });
        });
    }
    static getIdProduct(product_id){
        return new Promise((resolve, reject) => {
            const selectQuery = 'SELECT * FROM products';
            connection.query(selectQuery, (err, result) => {
                if(err){
                    reject(err)
                }
                resolve(result)
            });
        });
    }
 
}

 
  
  module.exports = ProductRepository;