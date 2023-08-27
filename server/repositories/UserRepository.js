const connection = require('../config/db');

class UserRepository {
    static createUser(name,surname,phone,adress,role,email,password) {
      console.log(name,surname,phone,adress,role,email,password)
        return new Promise((resolve,reject)=>{
            const sql = 'INSERT INTO users (user_name,user_surname,user_phone,user_address,user_role,user_email,user_password) VALUES (?, ?, ?, ?, ?, ?, ?)'
            connection.query(sql, [name,surname,phone,adress,role,email,password],(err,result)=>{
                if(err){
                  reject(err)
                }
                resolve(result)
            });
        });
    }
    static findUserByEmail(email) {
        return new Promise((resolve, reject) => {
          const sql = 'SELECT user_id,user_name,user_surname,user_phone,user_address,user_role,user_email FROM users WHERE user_email = ?';
          connection.query(sql, [email], (err, result) => {
            if (err) {
              reject(err);
            } else if (result.length === 0) {
              resolve(false);
            } else {
              console.log(result)
              resolve(result);
            }
          });
        });
    }
    static findUserByEmailandGetPassword(email) {
      console.log(email)
      return new Promise((resolve, reject) => {
        const sql = 'SELECT user_password FROM users WHERE user_email = ?';
        connection.query(sql, [email], (err, result) => {
          if (err) {
            reject("hata:",err);
          } else if (result.length === 0) {
            resolve(false);
          } else {
            resolve(result);
          }
        });
      });
    }
    static getUserIdByEmail (email) {
      return new Promise((resolve, reject) => {
          const getUserIdQuery = 'SELECT user_id FROM users WHERE user_email = ?';
          connection.query(getUserIdQuery, [email], (error, results) => {
              if (error) {
                  reject(error);
              } else if (results.length === 0) {
                  resolve(null);
              } else {
                  resolve(results[0].user_id);
              }
          });
      });
  };
    
  }
  
  module.exports = UserRepository;