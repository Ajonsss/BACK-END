import pool from '../models/db.js';
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getUser = async (id) =>{
    if(parseInt(id) === NaN){
        throw new Error('Invalid id');
    }

    const [user] = await pool.query('SELECT * FROM tbluser WHERE id = ?', [id]);
    return user;
}

export const createUser = async (email, password) => {
    if(email === '') {
        throw new Error('Invalid email');
    }

    if(!validator.isEmail(email)){
        throw new Error('Invalid email format');
    }

    const user = await pool.query(
        "Select * FROM tbluser WHERE email = ?",
        [email]
    )

    if(user.length > 0) {
        throw new Error (`An account is already created with that email`);
    
    }

    console.log (user)

    if(user.length === 1){
        const error = new Error (`The email ${email} is already used.`)
        error.statuscode = 400;
        throw error;
    }

    if(password === '') {
        throw new Error('Invalid Password');
    }

    if(!validator.isStrongPassword(password)){
        throw new Error('Password is too Weak.');
    }

    const salt = bcrypt.genSaltSync(10);
    const newPassword = bcrypt.hashSync(password, salt);

    const newUser = await pool.query(
        "INSERT INTO tbluser(email, password) VALUES(?, ?)",
        [email, newPassword]
    )

    return newUser.insertId;
}
///
export const login = async (email, password) => {
    if (email === '' || password === '') {
        throw new Error('Email and Password is reequired');
    }

    const [user] = await pool.query("SELECT * FROM tbluser WHERE email = ?", [email]);

    if (user.legnth === 0){
        throw new Error (`An account with email" ${email} does not exist.`);
    }

    if(!bcrypt.compareSync(password, user[0].password)){
        throw new Error ('Incorrect password.');
    }

    //
    const token = jwt.sign({id: user[0].id}, process.env.SECRET, {expiresIn: '1d'})

    return token;
}