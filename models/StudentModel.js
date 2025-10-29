import pool from './db.js';

export const getstudents = async () =>{
    const[rows] = await pool.query("SELECT * FROM tblstudents");
    return rows;
}