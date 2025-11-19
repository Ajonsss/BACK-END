//get data from user

import * as UserModel from "../models/UserModel.js";

export const register = async (req, res) => {
    const {email, password} = req.body; 

    try{
        const user = await UserModel.createUser(email, password);
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

    }catch(e){
        console.log(err);
        res.status(400).json({success: false, message: err})
    }
}
