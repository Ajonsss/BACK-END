import pool from './db.js';
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getUser = async (id) =>{
    if(parseInt(id) === NaN){
        throw new Error('Invalid id');
    }

    const [user] = await pool.query('SELECT * FROM tblandrae WHERE id = ?', [id]);
    return user;
}

export const createUser = async (userProfile, email, password) => {
    // Destructure the profile data coming from the controller
    const { name, birthdate, address, program, studentStatus } = userProfile;

    if(!email || !validator.isEmail(email)){
        throw new Error('Invalid email format');
    }

    // Check if user already exists
    const [existingUser] = await pool.query(
        "SELECT * FROM tblandrae WHERE email = ?",
        [email]
    )

    if(existingUser.length > 0) {
        throw new Error(`The email ${email} is already in use.`);
    }

    if(!password || !validator.isStrongPassword(password)){
        throw new Error('Password is too weak.');
    }

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const newPassword = bcrypt.hashSync(password, salt);


    const response = await fetch(
        `https://ais-simulated-legacy.onrender.com/api/studnets`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userProfile)
        }
    );
    const result = await response.json();
    // Insert ALL fields into the database
    const [newUser] = await pool.query(
        "INSERT INTO tblandrae(email, password) VALUES(?, ?)",
        [email, newPassword]
    )

    return newUser.insertId;
}

export const login = async (email, password) => {
    if (!email || !password) {
        throw new Error('Email and Password are required');
    }

    const [user] = await pool.query("SELECT * FROM tblandrae WHERE email = ?", [email]);

    // Fixed the 'user.length' typo here!
    if (user.length === 0){
        throw new Error (`An account with email ${email} does not exist.`);
    }

    if(!bcrypt.compareSync(password, user[0].password)){
        throw new Error ('Incorrect password.');
    }

    // Generate the Token
    const token = jwt.sign({id: user[0].id}, process.env.SECRET, {expiresIn: '1d'})

    return token;
}