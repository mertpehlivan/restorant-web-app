const mysql = require('mysql2');


class DatabaseManager{
    constructor() {
        this.dbConfig = {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'restaurant'
        };
        this.connection = mysql.createConnection(this.dbConfig);
    }
    createDatabase() {
        return new Promise((resolve, reject) => {
            const sql = 'CREATE DATABASE restaurant';
            this.connection.query(sql, (err, result) => {
                if (err) {
                    console.error(`Database could not be created: ${err.message}`);
                    reject(err);
                } else {
                    console.log('Database successfully created');
                    this.dbConfig.database = 'restaurant';
                    this.connection = mysql.createConnection(this.dbConfig);
                    resolve(result);
                }
            });
        });
    }

    createTables() {
        const createTablesSql = [
            `CREATE TABLE \`category\` (
                \`category_id\` INT AUTO_INCREMENT,
                \`category_name\` VARCHAR(50),
                PRIMARY KEY (\`category_id\`)
            );`,
    
            `CREATE TABLE \`users\` (
                \`user_id\` INT AUTO_INCREMENT,
                \`user_name\` VARCHAR(50),
                \`user_surname\` VARCHAR(50),
                \`user_phone\` VARCHAR(50),
                \`user_address\` VARCHAR(50),
                \`user_role\` VARCHAR(10),
                \`user_email\` VARCHAR(50),
                \`user_password\` VARCHAR(50),
                PRIMARY KEY (\`user_id\`)
            );`,
    
            `CREATE TABLE \`baskets\` (
                \`basket_id\` INT AUTO_INCREMENT,
                \`user_id\` INT,
                PRIMARY KEY (\`basket_id\`),
                FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`user_id\`)
            );`,
    
            `CREATE TABLE \`orders\` (
                \`order_id\` INT AUTO_INCREMENT,
                \`basket_total_price\` DECIMAL(10,2),
                \`order_time\` DATETIME,
                \`basket_id\` INT,
                PRIMARY KEY (\`order_id\`),
                FOREIGN KEY (\`basket_id\`) REFERENCES \`baskets\`(\`basket_id\`)
                
            );`,
    
            `CREATE TABLE \`card\` (
                \`card_id\` INT AUTO_INCREMENT,
                \`user_id\` INT,
                \`card_number\` VARCHAR(16),
                \`card_valid_thru\` VARCHAR(5),
                \`card_cvv\` VARCHAR(3),
                PRIMARY KEY (\`card_id\`),
                FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`user_id\`)
            );`,
    
            `CREATE TABLE \`products\` (
                \`product_id\` INT AUTO_INCREMENT,
                \`product_name\` VARCHAR(50),
                \`product_description\` TEXT,
                \`product_price\` DECIMAL(10,2),
                \`category_id\` INT,
                PRIMARY KEY (\`product_id\`),
                FOREIGN KEY (\`category_id\`) REFERENCES \`category\`(\`category_id\`)
            );`,
    
            `CREATE TABLE \`images\` (
                \`image_id\` INT AUTO_INCREMENT,
                \`image_url\` VARCHAR(100),
                \`product_id\` INT,
                PRIMARY KEY (\`image_id\`),
                FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`product_id\`)
            );`,
    
            `CREATE TABLE \`product_basket\` (
                \`product_basket\` INT AUTO_INCREMENT,
                \`basket_id\` INT,
                \`product_id\` INT,
                PRIMARY KEY (\`product_basket\`),
                FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`product_id\`),
                FOREIGN KEY (\`basket_id\`) REFERENCES \`baskets\`(\`basket_id\`)
            );`
        ];
        return new Promise((resolve, reject) => {
            
            const executeQueries = async (queries, index) => {
                if (index === queries.length) {
                    console.log('All tables created successfully.');
                    this.connection.end();
                    resolve();
                    return;
                }
                
                this.connection.query(queries[index], (err, result) => {
                    if (err) {
                        console.error('Error creating table:', err.message);
                        reject(err);
                    } else {
                        console.log(`Table ${index + 1} created successfully.`);
                    }

                    executeQueries(queries, index + 1);
                    
                });
                
            };

            executeQueries(createTablesSql, 0);
            
        });
    }
}

module.exports = DatabaseManager;





