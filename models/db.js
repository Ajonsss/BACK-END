import mysql from "mysql2/promise.js";

const pool = mysql.createPool({
    host: "localhost",         // <-- hardcoded
    user: "root",              // <-- hardcoded
    password: "", 
    database: "andraedb"      // <-- hardcoded (assuming this is what you named it)
});

export default pool;