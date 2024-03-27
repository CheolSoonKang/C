import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();
console.log('ddddd' + process.env.DB_HOST);
const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});
conn.connect();

export default conn;
