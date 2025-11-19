import jwt from "jsonwebtoken";
import * as UserModel from "../models/UserModel.js";

const checkToken = async(req, res, next) => {
    const {authorization} = req.headers;
    if(!authorization){
        res.status(401).json({
            success: false,
            message: [
                {result : "You do npt have permission to access the app"}
            ]
        })
    }

    const token = authorization.split(' ')[1];

    try{
        const {id} = jwt.verify(token, process.env.SECRET);
        const [user] = await UserModel.getUser(id);
        //req.user = user[0].id;
        next();
    }catch(err){
        res.status(401).json({
            success: false,
            message: [
                {result : "Request is Unauthorized"}
            ]
        })
    }

    
}

export default checkToken;