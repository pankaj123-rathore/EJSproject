import mysql from "mysql2";

const pool = mysql.createPool({
    user: "root",
    password: "root",
    database: "ecommerceapp",
    host: "localhost"
});

export default pool;