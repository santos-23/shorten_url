const mysql = require("mysql");
require("dotenv").config();

const db1 = mysql.createPool({
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DB  // shorten_url
})

module.exports = { 
    shortenUrlDB: db1
};