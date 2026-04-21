//get data from user

import * as UserModel from "../models/UserModel.js";

export const register = async (req, res) => {
    const {
        firstName,
        lastName,
        birthdate,
        course,
        major,
        address,
        studentStatus,
        email, 
        password} = req.body; 

    try{
        const userProfile = {
            firstName, 
            lastName,
            birthdate, 
            course,
            major,
            address,
            studentStatus};
           
        const user = await UserModel.createUser(userProfile, email, password);
        res.status(201).json({success: true, message: user});
    }catch(err){
        console.log(err);
        res.status(400).json({success: false, message: err})
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body; 

    try{
        const token = await UserModel.login(email, password);
        res.status(200).json({
            success: true, 
            message: [
                {result: "Login Succesful!"},
            token]
    });

    }catch(err){
        console.log(err);
        res.status(400).json({success: false, message: err.message}) // <--- Added .message
    }
}
